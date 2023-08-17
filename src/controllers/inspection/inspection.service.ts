import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Inspection,
  InspectionDocument,
} from 'src/schemas/inspection/inspection.schema';
import {
  CreateInspectionDto,
  FilterInspectionDto,
  SelectInspectionDto,
  UpdateStatusDto,
  UpdateTransactionDto,
} from './inspection.dto';
import { ItemParameterService } from '../item-parameter/item-parameter.service';
import { BatchOriginService } from '../batch-origin/batch-origin.service';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { DocOriginService } from '../doc-origin/doc-origin.service';
import { WeighBridgeService } from '../weigh-bridge/weigh-bridge.service';
import { TransactionReportService } from '../transaction-report/transaction-report.service';
import { RejectionItemService } from '../rejection-item/rejection-item.service';
import { CancellationItemService } from '../cancellation-item/cancellation-item.service';

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(Inspection.name)
    private readonly inspectionModel: Model<InspectionDocument>,
    private readonly itemParameterService: ItemParameterService,
    private readonly batchOriginService: BatchOriginService,
    private readonly requestGenerater: RequestGenerater,
    private readonly docOriginService: DocOriginService,
    private readonly weighBridgeService: WeighBridgeService,
    private readonly reportService: TransactionReportService,
    private readonly rejectionItemService: RejectionItemService,
    private readonly cancellationItemService: CancellationItemService,
  ) {}

  async create_newInspection(dto: CreateInspectionDto) {
    const inspectItem = await this.docOriginService.get_selectedOrigin(
      dto.docOrigin,
    );

    const checkingData = await this.itemParameterService.inspectionParameters(
      inspectItem,
    );

    const newBatch = await this.batchOriginService.save_newBatch();

    const requestData = await this.requestGenerater.create_NewRequest(
      this.inspectionModel,
      'REQ',
    );

    const inspectionData = {
      number: requestData.requestNumber,
      requestId: requestData.requestId,
      docOrigin: dto.docOrigin,
      stage: inspectItem.stage,
      itemCode: inspectItem.itemCode,
      baseDoc: inspectItem.baseDoc,
      batch: newBatch,
      qualityChecking: checkingData,
      quantity: '_',
      warehouse: '_',
      qcStatus: 'Pending',
      transaction: 'Pending',
      inspector: '',
      inspectionDate: '',
      transferor: '',
      transactionDate: '',
      description: '',
      remarks: '',
      code: '',
      date: '2023-04-16',
    };

    const newInspection = new this.inspectionModel(inspectionData);
    return newInspection.save();
  }

  async get_allInspections(dto: FilterInspectionDto) {
    if (dto.qcStatus === 'All') {
      delete dto.qcStatus;
    }

    if (dto.stage === 'All') {
      delete dto.stage;
    }

    if (dto.transaction === 'All') {
      delete dto.transaction;
    }

    if (dto.date) {
      dto.date = dto.date.slice(0, 10);
    }

    return await this.inspectionModel.find(dto).sort({ number: -1 }).exec();
  }

  async get_selectedInspection(dto: SelectInspectionDto) {
    return await this.inspectionModel
      .findOne({ _id: dto.inspectId })
      .populate({
        path: 'qualityChecking',
        populate: {
          path: 'standardData',
          populate: {
            path: 'parameterId',
            populate: { path: 'uom equipment' },
          },
        },
      })
      .exec();
  }

  async update_qcStatus(dto: UpdateStatusDto) {
    const id = dto.inspectId;
    delete dto.inspectId;

    console.log(dto);

    const updateStatus = await this.inspectionModel.updateOne(
      { _id: id },
      { $set: dto },
    );
    return updateStatus;
  }

  async update_Transaction(dto: UpdateTransactionDto) {
    const updateData = {
      transaction: dto.transaction,
      transferor: dto.transferor,
      transactionDate: dto.transactionDate,
    };
    const updateTransaction = await this.inspectionModel.updateOne(
      { _id: dto.inspectId },
      { $set: updateData },
    );

    if (updateTransaction.modifiedCount !== 1) {
      throw new BadRequestException('This request already transfered');
    }

    if (dto.qcStatus !== 'Rejected') {
      const updateRejection =
        await this.rejectionItemService.exist_FinderUpdate({
          batch: dto.batch,
          date: dto.transactionDate,
          origin: dto.inspectCode,
        });
    }

    if (dto.stage === 'Token') {
      return await this.find_transferSectionTOKEN(dto);
    }
  }

  async find_transferSectionTOKEN(dto: UpdateTransactionDto) {
    if (dto.qcStatus === 'Approved') {
      const refData = await this.docOriginService.get_subData(dto.docOrigin);

      const weibridgeDto = {
        tokenNo: dto.baseDocNo,
        po: refData.refDoc,
        itemCode: dto.itemCode,
        line: refData.line,
        batch: dto.batch,
        date: dto.transactionDate,
      };

      const createdResponse =
        await this.weighBridgeService.create_weighBridgeRequest(weibridgeDto);
      return await this.create_newTransactionReport(dto, createdResponse);
    } else if (dto.qcStatus === 'Rejected') {
      const rejectDto = {
        itemCode: dto.itemCode,
        batch: dto.batch,
        stage: dto.stage,
        origin: dto.inspectCode,
        rejectedDate: dto.transactionDate,
        rejectCode: dto.code,
      };

      const createdResponse =
        await this.rejectionItemService.create_rejectionRequest(rejectDto);
      return await this.create_newTransactionReport(dto, createdResponse);
    } else if (dto.qcStatus === 'Cancelled') {
      const cancelDto = {
        docOrigin: dto.docOrigin,
        cancelDate: dto.transactionDate,
        stage: dto.stage,
        baseDocNo: dto.baseDocNo,
        itemCode: dto.itemCode,
        batchNo: dto.batch,
        code: dto.code,
      };

      const createdResponse =
        await this.cancellationItemService.create_newCancellationitem(
          cancelDto,
        );
      return await this.create_newTransactionReport(dto, createdResponse);
    }
  }

  async create_newTransactionReport(requestStatus: any, responseStatus: any) {
    const reportDto = {
      requestNo: requestStatus.inspectId,
      requestCode: requestStatus.inspectCode,
      transferTo: responseStatus.transferTo,
      newRequest: responseStatus.newRequest,
    };
    return await this.reportService.create_newTransaction(reportDto);
  }

  async get_minimalData(dto: SelectInspectionDto) {
    return await this.inspectionModel.findOne({ requestId: dto.inspectId });
  }

  async get_selectedRequest(requestNo: string) {
    return await this.inspectionModel.findOne({ requestId: requestNo });
  }

  async create_newRequest_to_currentBatch(dto: SelectInspectionDto) {
    const needData = await this.inspectionModel.findOne({
      requestId: dto.inspectId,
    });

    const inspectItem = await this.docOriginService.get_selectedOrigin(
      needData.docOrigin,
    );

    const checkingData = await this.itemParameterService.inspectionParameters(
      inspectItem,
    );

    const requestData = await this.requestGenerater.create_NewRequest(
      this.inspectionModel,
      'REQ',
    );

    const inspectionData = {
      number: requestData.requestNumber,
      requestId: requestData.requestId,
      docOrigin: needData.docOrigin,
      stage: inspectItem.stage,
      itemCode: inspectItem.itemCode,
      baseDoc: inspectItem.baseDoc,
      batch: needData.batch,
      qualityChecking: checkingData,
      quantity: '_',
      warehouse: '_',
      qcStatus: 'Pending',
      transaction: 'Pending',
      inspector: '',
      inspectionDate: '',
      transferor: '',
      transactionDate: '',
      description: '',
      remarks: '',
      code: '',
      date: '2023-04-16',
    };

    const newInspection = new this.inspectionModel(inspectionData);
    return newInspection.save();
  }
}

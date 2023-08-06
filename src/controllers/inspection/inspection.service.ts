import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inspection, InspectionDocument } from 'src/schemas/inspection.schema';
import { CreateInspectionDto, FilterInspectionDto, SelectInspectionDto } from './inspection.dto';
import { ItemParameterService } from '../item-parameter/item-parameter.service';
import { BatchOriginService } from '../batch-origin/batch-origin.service';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { DocOriginService } from '../doc-origin/doc-origin.service';

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(Inspection.name)
    private readonly inspectionModel: Model<InspectionDocument>,
    private readonly itemParameterService: ItemParameterService,
    private readonly batchOriginService: BatchOriginService,
    private readonly requestGenerater: RequestGenerater,
    private readonly docOriginService: DocOriginService,
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
      description: '',
      remarks: '',
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

    if(dto.date) {
      dto.date = dto.date.slice(0, 10)
    }

    return await this.inspectionModel.find(dto).sort({ number: -1 }).exec();
  }

  async get_selectedInspection(dto: SelectInspectionDto) {
    return await this.inspectionModel
      .findOne({_id: dto.inspectId})
      .populate({
        path: 'qualityChecking',
        populate: {
          path: 'standardData',
          populate: { path: 'parameterId', populate: { path: 'uom equipment' } },
        },
      })
      .exec();
  }
}

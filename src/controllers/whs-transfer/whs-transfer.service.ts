import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateWhsTransactionDto,
  FilterWhsReportDto,
  FilterWhsTransactionDto,
  UpdateWhsTransactionDto,
} from './whs-transfer.dto';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { InjectModel } from '@nestjs/mongoose';
import {
  WhsTransfer,
  WhsTransferDocument,
} from 'src/schemas/inspection/whs-transfer.schema';
import { Model } from 'mongoose';

@Injectable()
export class WhsTransferService {
  constructor(
    @InjectModel(WhsTransfer.name)
    private readonly whsTransferModel: Model<WhsTransferDocument>,
    private readonly requestGenerater: RequestGenerater,
  ) {}

  async create_whsRequest(dto: CreateWhsTransactionDto) {
    const requestData = await this.requestGenerater.create_NewRequest(
      this.whsTransferModel,
      'WTR',
    );

    const transaction = {
      number: requestData.requestNumber,
      transferNo: requestData.requestId,
      asignedDate: dto.origin.transactionDate,
      stage: dto.origin.stage,
      baseDoc: dto.origin.baseDoc,
      itemCode: dto.origin.itemCode,
      batch: dto.origin.batch,
      fromWarehouse: dto.origin.warehouse,
      transaction: 'Pending',
      origin: dto.origin.requestId,
      quantity: dto.origin.quantity,
      qcStatus: dto.origin.qcStatus,
      code: dto.origin.code,
      transferBy: '',
      transferDate: '',
      toWarehouse: '',
    };

    const newTransaction = new this.whsTransferModel(transaction);
    const response = await newTransaction.save();

    if (!response) {
      throw new BadRequestException('Internal server error');
    }
    return {
      transferTo: 'Warehouse transfers',
      newRequest: response.transferNo,
    };
  }

  async get_allTransactions(dto: FilterWhsTransactionDto) {
    if (dto.stage === 'All') {
      delete dto.stage;
    }

    if (dto.transaction === 'All') {
      delete dto.transaction;
    }

    if (dto.asignedDate) {
      dto.asignedDate = dto.asignedDate.slice(0, 10);
    }

    return await this.whsTransferModel.find(dto).sort({ number: -1 }).exec();
  }

  async get_transactionReports(dto: FilterWhsReportDto) {
    if (dto.stage === 'All') {
      delete dto.stage;
    }

    if (dto.transferDate) {
      dto.transferDate = dto.transferDate.slice(0, 10);
    }

    console.log(dto);

    const filter = { ...dto, transaction: 'Completed' };

    return await this.whsTransferModel.find(filter).sort({ number: -1 });
  }

  async update_warehouseTransaction(dto: UpdateWhsTransactionDto) {
    const id = dto.transferId;
    delete dto.transferId;

    const updater = { ...dto, transaction: 'Completed' };

    const response = await this.whsTransferModel.updateOne(
      { _id: id },
      { $set: updater },
    );

    if (response.modifiedCount !== 1) {
      throw new BadRequestException('Error updating');
    }

    return { message: `Successfully transfered to ${dto.toWarehouse}` };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TransactionReport,
  TransactionReportDocument,
} from 'src/schemas/inspection/transaction-report.schema';
import {
  CreateReportDto,
  SelectedTransactionDto,
} from './transaction-report.dto';

@Injectable()
export class TransactionReportService {
  constructor(
    @InjectModel(TransactionReport.name)
    private readonly reportModel: Model<TransactionReportDocument>,
  ) {}

  async create_newTransaction(dto: CreateReportDto) {
    const newReport = new this.reportModel(dto);
    const response = await newReport.save();

    if (response) {
      return {
        transferTo: dto.transferTo,
        generatedRequest: dto.newRequest,
      };
    }
  }

  async get_selectedTransaction(dto: SelectedTransactionDto) {
    return await this.reportModel.findOne(dto);
  }
}

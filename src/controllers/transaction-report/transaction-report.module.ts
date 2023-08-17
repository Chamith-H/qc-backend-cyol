import { Module } from '@nestjs/common';
import { TransactionReportController } from './transaction-report.controller';
import { TransactionReportService } from './transaction-report.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionReport,
  TransactionReportSchema,
} from 'src/schemas/inspection/transaction-report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionReport.name, schema: TransactionReportSchema },
    ]),
  ],
  controllers: [TransactionReportController],
  providers: [TransactionReportService],
  exports: [TransactionReportService],
})
export class TransactionReportModule {}

import { Module } from '@nestjs/common';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Inspection,
  InspectionSchema,
} from 'src/schemas/inspection/inspection.schema';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';
import { BatchOriginModule } from '../batch-origin/batch-origin.module';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { DocOriginModule } from '../doc-origin/doc-origin.module';
import { WeighBridgeModule } from '../weigh-bridge/weigh-bridge.module';
import { TransactionReportModule } from '../transaction-report/transaction-report.module';
import { RejectionItemModule } from '../rejection-item/rejection-item.module';
import { CancellationItemModule } from '../cancellation-item/cancellation-item.module';
import { RejectionDataModule } from '../rejection-data/rejection-data.module';
import { WhsTransferModule } from '../whs-transfer/whs-transfer.module';
import { DateCreater } from 'src/configs/shared/date.creater';
import { SapIntegrationModule } from '../sap-integration/sap-integration.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inspection.name, schema: InspectionSchema },
    ]),
    ItemParameterModule,
    BatchOriginModule,
    DocOriginModule,
    SapIntegrationModule,
    WeighBridgeModule,
    TransactionReportModule,
    RejectionItemModule,
    CancellationItemModule,
    RejectionDataModule,
    WhsTransferModule,
  ],
  controllers: [InspectionController],
  providers: [InspectionService, RequestGenerater, DateCreater],
  exports: [InspectionService],
})
export class InspectionModule {}

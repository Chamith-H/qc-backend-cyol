import { Module } from '@nestjs/common';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inspection, InspectionSchema } from 'src/schemas/inspection.schema';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';
import { BatchOriginModule } from '../batch-origin/batch-origin.module';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { DocOriginModule } from '../doc-origin/doc-origin.module';
import { WeighBridgeModule } from '../weigh-bridge/weigh-bridge.module';
import { TransactionReportModule } from '../transaction-report/transaction-report.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inspection.name, schema: InspectionSchema },
    ]),
    ItemParameterModule,
    BatchOriginModule,
    DocOriginModule,
    WeighBridgeModule,
    TransactionReportModule,
  ],
  controllers: [InspectionController],
  providers: [InspectionService, RequestGenerater],
})
export class InspectionModule {}

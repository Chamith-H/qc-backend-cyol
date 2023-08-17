import {
  Inspection,
  InspectionSchema,
} from 'src/schemas/inspection/inspection.schema';
import { Module } from '@nestjs/common';
import { RejectionDataController } from './rejection-data.controller';
import { RejectionDataService } from './rejection-data.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RejectionData,
  RejectionDataSchema,
} from 'src/schemas/rejection/rejection-data.schema';
import { RejectionActionModule } from '../rejection-action/rejection-action.module';
import { RejectionListModule } from '../rejection-list/rejection-list.module';
import {
  RejectionItem,
  RejectionItemSchema,
} from 'src/schemas/rejection/rejection-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RejectionData.name, schema: RejectionDataSchema },
    ]),
    MongooseModule.forFeature([
      { name: Inspection.name, schema: InspectionSchema },
    ]),
    MongooseModule.forFeature([
      { name: RejectionItem.name, schema: RejectionItemSchema },
    ]),
    RejectionActionModule,
    RejectionListModule,
  ],
  controllers: [RejectionDataController],
  providers: [RejectionDataService],
  exports: [RejectionDataService],
})
export class RejectionDataModule {}

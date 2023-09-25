import { Module } from '@nestjs/common';
import { WeightRecordService } from './weight-record.service';
import { WeightRecordController } from './weight-record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WeightRecordMain,
  WeightRecordMainSchema,
} from 'src/schemas/weight-record/weight-record-main.schema';
import {
  WeightRecordItem,
  WeightRecordItemSchema,
} from 'src/schemas/weight-record/weight-record-item.schema';
import {
  WeightRecordTime,
  WeightRecordTimeSchema,
} from 'src/schemas/weight-record/weight-record-time.schema';
import {
  WeightRecordShift,
  WeightRecordShiftSchema,
} from 'src/schemas/weight-record/weight-record-shift.schema';
import { DateCreater } from 'src/configs/shared/date.creater';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WeightRecordMain.name, schema: WeightRecordMainSchema },
    ]),
    MongooseModule.forFeature([
      { name: WeightRecordItem.name, schema: WeightRecordItemSchema },
    ]),
    MongooseModule.forFeature([
      { name: WeightRecordTime.name, schema: WeightRecordTimeSchema },
    ]),
    MongooseModule.forFeature([
      { name: WeightRecordShift.name, schema: WeightRecordShiftSchema },
    ]),
    ItemParameterModule,
  ],
  providers: [WeightRecordService, DateCreater, RequestGenerater],
  controllers: [WeightRecordController],
})
export class WeightRecordModule {}

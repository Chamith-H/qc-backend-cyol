import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WeightRecordShiftDocument } from './weight-record-shift.schema';

export type WeightRecordMainDocument = WeightRecordMain & Document;

@Schema()
export class WeightRecordMain {
  @Prop()
  number: number;

  @Prop()
  requestNo: string;

  @Prop()
  date: string;

  @Prop()
  checkedStatus: string;

  @Prop({ type: [{ type: String, ref: 'WeightRecordShift' }] })
  shifts: WeightRecordShiftDocument['_id'][];
}

export const WeightRecordMainSchema =
  SchemaFactory.createForClass(WeightRecordMain);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WeightRecordTimeDocument } from './weight-record-time.schema';

export type WeightRecordShiftDocument = WeightRecordShift & Document;

@Schema()
export class WeightRecordShift {
  @Prop()
  shift: string;

  @Prop({ type: Object })
  origin: any;

  @Prop()
  status: string;

  @Prop({ type: [{ type: String, ref: 'WeightRecordTime' }] })
  times: WeightRecordTimeDocument['_id'][];
}

export const WeightRecordShiftSchema =
  SchemaFactory.createForClass(WeightRecordShift);

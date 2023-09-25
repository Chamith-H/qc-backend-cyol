import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WeightRecordItemDocument } from './weight-record-item.schema';

export type WeightRecordTimeDocument = WeightRecordTime & Document;

@Schema()
export class WeightRecordTime {
  @Prop()
  time: string;

  @Prop({ type: Object })
  origin: any;

  @Prop({ type: [{ type: String, ref: 'WeightRecordItem' }] })
  items: WeightRecordItemDocument['_id'][];

  @Prop()
  status: string;
}

export const WeightRecordTimeSchema =
  SchemaFactory.createForClass(WeightRecordTime);

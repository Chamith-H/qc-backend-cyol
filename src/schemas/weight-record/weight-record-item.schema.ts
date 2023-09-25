import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObservedDataDocument } from '../inspection/observed-data.schema';

export type WeightRecordItemDocument = WeightRecordItem & Document;

@Schema()
export class WeightRecordItem {
  @Prop()
  item: string;

  @Prop()
  batch: string;

  @Prop()
  remarks: string;

  @Prop({ type: Object })
  origin: any;

  @Prop({ type: [{ type: String, ref: 'ObservedData' }] })
  qualityChecking: ObservedDataDocument['_id'][];

  @Prop()
  status: string;

  @Prop()
  checkedBy: string;

  @Prop()
  checkedDate: string;
}

export const WeightRecordItemSchema =
  SchemaFactory.createForClass(WeightRecordItem);

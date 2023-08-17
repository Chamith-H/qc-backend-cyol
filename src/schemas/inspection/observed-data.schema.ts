import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StandardDataDocument } from '../item-parameter/standard-data.schema';

export type ObservedDataDocument = ObservedData & Document;

@Schema()
export class ObservedData {
  @Prop({ type: String, ref: 'StandardData' })
  standardData: StandardDataDocument['id'];

  @Prop()
  observedValue: string;

  @Prop()
  checker: string;

  @Prop()
  checkedDate: string;
}

export const ObservedDataSchema = SchemaFactory.createForClass(ObservedData);

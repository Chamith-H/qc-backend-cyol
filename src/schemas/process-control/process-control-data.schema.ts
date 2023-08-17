import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { StandardDataDocument } from '../item-parameter/standard-data.schema';

export type ProcessControlDataDocument = ProcessControlData & Document;

@Schema()
export class ProcessControlData {
  @Prop({ type: String, ref: 'StandardData' })
  standardData: StandardDataDocument['id'];

  @Prop()
  observedValue: string;

  @Prop()
  checker: string;

  @Prop()
  checkedDate: string;

  @Prop()
  verifier: string;

  @Prop()
  verifiedDate: string;
}

export const ProcessControlDataSchema = SchemaFactory.createForClass(ProcessControlData);

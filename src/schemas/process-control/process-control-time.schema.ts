import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObservedDataDocument } from '../inspection/observed-data.schema';

export type ProcessControlTimeDocument = ProcessControlTime & Document;

@Schema()
export class ProcessControlTime {
  @Prop()
  time: string;

  @Prop({ type: [{ type: String, ref: 'ObservedData' }] })
  qualityChecking: ObservedDataDocument['_id'][];

  @Prop()
  status: string;

  @Prop()
  verifiedBy: string;

  @Prop()
  verifiedDate: string;
}

export const ProcessControlTimeSchema =
  SchemaFactory.createForClass(ProcessControlTime);

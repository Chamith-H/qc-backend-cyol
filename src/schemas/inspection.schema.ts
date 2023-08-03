import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObservedDataDocument } from './observed-data.schema';

export type InspectionDocument = Inspection & Document;
@Schema()
export class Inspection {
  @Prop()
  number: number;

  @Prop()
  requestId: string;

  @Prop()
  baseDocument: string;

  @Prop()
  stage: string;

  @Prop()
  itemCode: string;

  @Prop()
  baseDoc: string;

  @Prop()
  batch: string;

  @Prop({ type: [{ type: String, ref: 'ObservedData' }] })
  qualityChecking: ObservedDataDocument['_id'][];

  @Prop()
  quantity: string;

  @Prop()
  warehouse: string;

  @Prop()
  qcStatus: string;

  @Prop()
  transaction: string;

  @Prop()
  inspector: string;

  @Prop()
  inspectionDate: string;

  @Prop()
  description: string;

  @Prop()
  remarks: string;

  @Prop()
  date: string;
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);

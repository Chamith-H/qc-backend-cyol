import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObservedDataDocument } from './observed-data.schema';
import { DocOriginDocument } from '../origin/doc-origin.schema';

export type InspectionDocument = Inspection & Document;
@Schema()
export class Inspection {
  @Prop()
  number: number;

  @Prop()
  requestId: string;

  @Prop({ type: String, ref: 'DocOrigin' })
  docOrigin: DocOriginDocument['id'];

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
  transferor: string;

  @Prop()
  transactionDate: string;

  @Prop()
  description: string;

  @Prop()
  remarks: string;

  @Prop()
  code: string;

  @Prop()
  date: string;
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);

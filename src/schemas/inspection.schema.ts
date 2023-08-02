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
  baseDocId: string;

  @Prop()
  itemCode: string;

  @Prop()
  batch: number;

  @Prop()
  stage: string;

  @Prop({ type: [{ type: String, ref: 'ObservedData' }] })
  qualityChecking: ObservedDataDocument['_id'][];

  @Prop()
  quantity: string;
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RejectionDataDocument } from './rejection-data.schema';

export type RejectionItemDocument = RejectionItem & Document;

@Schema()
export class RejectionItem {
  @Prop()
  number: number;

  @Prop()
  rejectionNo: string;

  @Prop()
  stage: string;

  @Prop()
  itemCode: string;

  @Prop()
  batch: string;

  @Prop({ type: [{ type: String, ref: 'RejectionData' }] })
  rejectionData: RejectionDataDocument['_id'][];
}

export const RejectionItemSchema = SchemaFactory.createForClass(RejectionItem);

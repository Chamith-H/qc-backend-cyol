import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocOriginDocument } from '../origin/doc-origin.schema';

export type CancellationItemDocument = CancellationItem & Document;

@Schema()
export class CancellationItem {
  @Prop()
  number: number;

  @Prop()
  cancellationNo: string;

  @Prop({ type: String, ref: 'DocOrigin' })
  docOrigin: DocOriginDocument['_id'];

  @Prop()
  cancelDate: string;

  @Prop()
  stage: string;

  @Prop()
  baseDocNo: string;

  @Prop()
  itemCode: string;

  @Prop()
  batchNo: string;

  @Prop()
  code: string;

  @Prop()
  transaction: string;

  @Prop()
  transferedBy: string;

  @Prop()
  transferDate: string;
}

export const CancellationItemSchema =
  SchemaFactory.createForClass(CancellationItem);

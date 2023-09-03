import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WhsTransferDocument = WhsTransfer & Document;

@Schema()
export class WhsTransfer {
  @Prop()
  number: number;

  @Prop()
  transferNo: string;

  @Prop()
  asignedDate: string;

  @Prop()
  stage: string;

  @Prop()
  baseDoc: string;

  @Prop()
  itemCode: string;

  @Prop()
  batch: string;

  @Prop()
  fromWarehouse: string;

  @Prop()
  transaction: string;

  @Prop()
  origin: string;

  @Prop()
  quantity: string;

  @Prop()
  qcStatus: string;

  @Prop()
  code: string;

  @Prop()
  transferBy: string;

  @Prop()
  transferDate: string;

  @Prop()
  toWarehouse: string;
}

export const WhsTransferSchema = SchemaFactory.createForClass(WhsTransfer);

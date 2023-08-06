import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionReportDocument = TransactionReport & Document;

@Schema()
export class TransactionReport {
  @Prop()
  requestNo: string;

  @Prop()
  requestCode: string;

  @Prop()
  transferTo: string;

  @Prop()
  newRequest: string;
}

export const TransactionReportSchema = SchemaFactory.createForClass(TransactionReport);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RejectListDocument = RejectList & Document;

@Schema()
export class RejectList {
  @Prop()
  stage: string;

  @Prop()
  baseDoc: string;

  @Prop()
  itemCode: string;

  @Prop()
  batch: string;

  @Prop()
  code: string;

  @Prop()
  round: string;

  @Prop()
  rejectNo: string;

  @Prop()
  inspectNo: string;
}

export const RejectListSchema = SchemaFactory.createForClass(RejectList);

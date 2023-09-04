import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SapGrnDocument = SapGrn & Document;

@Schema()
export class SapGrn {
  @Prop()
  grnNo: number;
}

export const SapGrnSchema = SchemaFactory.createForClass(SapGrn);

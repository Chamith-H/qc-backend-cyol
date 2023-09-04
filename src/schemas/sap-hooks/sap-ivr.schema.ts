import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SapIvrDocument = SapIvr & Document;

@Schema()
export class SapIvr {
  @Prop()
  ivrNo: number;
}

export const SapIvrSchema = SchemaFactory.createForClass(SapIvr);

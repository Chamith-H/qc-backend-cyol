import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SapReturnDocument = SapReturn & Document;

@Schema()
export class SapReturn {
  @Prop()
  rtnNo: number;
}

export const SapReturnSchema = SchemaFactory.createForClass(SapReturn);

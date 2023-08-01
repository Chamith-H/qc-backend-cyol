import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BaseDocDocument = BaseDoc & Document;

@Schema()
export class BaseDoc {
  @Prop()
  baseDocId: string;
}

export const BaseDocSchema = SchemaFactory.createForClass(BaseDoc);
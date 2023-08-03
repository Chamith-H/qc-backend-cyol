import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DocOriginDocument } from './doc-origin.schema';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop()
  number: number;

  @Prop()
  tokenId: string;

  @Prop()
  poNumber: string;

  @Prop()
  supplier: string;

  @Prop()
  driver: string;

  @Prop()
  vehicle: string;

  @Prop({ type: [{ type: String, ref: 'DocOrigin' }] })
  docItems: DocOriginDocument['_id'][];

  @Prop()
  date: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

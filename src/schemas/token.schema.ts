import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop()
  items: any[];

  @Prop()
  date: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeighbridgeDocument = Weighbridge & Document;

@Schema()
export class Weighbridge {
  @Prop()
  number: number;

  @Prop()
  requestNo: string;

  @Prop()
  tokenNo: string;

  @Prop()
  date: string;

  @Prop()
  po: string;

  @Prop()
  itemCode: string;

  @Prop()
  line: number;

  @Prop()
  batch: string;

  @Prop()
  transaction: string;

  @Prop()
  itemWeight: string;
}

export const WeighbridgeSchema = SchemaFactory.createForClass(Weighbridge);

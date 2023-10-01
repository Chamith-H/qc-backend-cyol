import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProdCommonTimeDocument } from './prod-common-time.schema';

export type ProdCommonItemDocument = ProdCommonItem & Document;

@Schema()
export class ProdCommonItem {
  @Prop()
  item: string;

  @Prop()
  batch: string;

  @Prop({ type: Object })
  origin: any;

  @Prop({ type: [{ type: String, ref: 'ProdCommonTime' }] })
  times: ProdCommonTimeDocument['_id'][];

  @Prop()
  status: string;
}

export const ProdCommonItemSchema =
  SchemaFactory.createForClass(ProdCommonItem);

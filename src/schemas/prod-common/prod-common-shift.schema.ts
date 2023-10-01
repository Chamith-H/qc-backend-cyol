import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProdCommonItemDocument } from './prod-common-item.schema';

export type ProdCommonShiftDocument = ProdCommonShift & Document;

@Schema()
export class ProdCommonShift {
  @Prop()
  shift: string;

  @Prop({ type: Object })
  origin: any;

  @Prop()
  status: string;

  @Prop({ type: [{ type: String, ref: 'ProdCommonItem' }] })
  items: ProdCommonItemDocument['_id'][];
}

export const ProdCommonShiftSchema =
  SchemaFactory.createForClass(ProdCommonShift);

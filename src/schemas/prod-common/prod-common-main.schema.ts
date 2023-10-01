import { ProdCommonShiftDocument } from './prod-common-shift.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProdCommonMainDocument = ProdCommonMain & Document;

@Schema()
export class ProdCommonMain {
  @Prop()
  number: number;

  @Prop()
  requestNo: string;

  @Prop()
  category: string;

  @Prop()
  date: string;

  @Prop()
  checkedStatus: string;

  @Prop({ type: [{ type: String, ref: 'ProdCommonShift' }] })
  shifts: ProdCommonShiftDocument['_id'][];
}

export const ProdCommonMainSchema =
  SchemaFactory.createForClass(ProdCommonMain);

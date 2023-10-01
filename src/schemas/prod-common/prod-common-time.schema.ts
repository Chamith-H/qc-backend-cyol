import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObservedDataDocument } from '../inspection/observed-data.schema';

export type ProdCommonTimeDocument = ProdCommonTime & Document;

@Schema()
export class ProdCommonTime {
 
  @Prop()
  item: string;

  @Prop()
  batch: string;

  @Prop()
  remarks: string;

  @Prop({ type: Object })
  origin: any;

  @Prop({ type: [{ type: String, ref: 'ObservedData' }] })
  qualityChecking: ObservedDataDocument['_id'][];

  @Prop()
  status: string;

  @Prop()
  checkedBy: string;

  @Prop()
  checkedDate: string;
}

export const ProdCommonTimeSchema =
  SchemaFactory.createForClass(ProdCommonTime);

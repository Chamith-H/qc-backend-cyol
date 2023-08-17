import { StageDocument } from './stage.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemParameterDocument = ItemParameter & Document;

@Schema()
export class ItemParameter {
  @Prop()
  itemCode: string;

  @Prop({ type: [{ type: String, ref: 'Stage' }] })
  stages: StageDocument['_id'][];
}

export const ItemParameterSchema = SchemaFactory.createForClass(ItemParameter);

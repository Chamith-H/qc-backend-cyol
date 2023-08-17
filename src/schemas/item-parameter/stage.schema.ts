import { StandardDataDocument } from './standard-data.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StageDocument = Stage & Document;

@Schema()
export class Stage {
  @Prop()
  stageName: string;

  @Prop({ type: [{ type: String, ref: 'StandardData' }] })
  parameterData: StandardDataDocument['_id'][];
}

export const StageSchema = SchemaFactory.createForClass(Stage);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import { QcParameterDocument } from './qc-parameter.schema';

export type StandardDataDocument = StandardData & Document;

@Schema()
export class StandardData {
  @Prop({type: String, ref: 'QcParameter'})
  parameter: QcParameterDocument['id']

  @Prop()
  minValue: string;

  @Prop()
  maxValue: string;

  @Prop()
  stdValue: string;
}

export const StandardDataSchema = SchemaFactory.createForClass(StandardData);
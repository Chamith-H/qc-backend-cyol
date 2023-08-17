import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { QcParameterDocument } from '../qc-parameter/qc-parameter.schema';

export type StandardDataDocument = StandardData & Document;

@Schema()
export class StandardData {
  @Prop({ type: String, ref: 'QcParameter' })
  parameterId: QcParameterDocument['id'];

  @Prop()
  minValue: string;

  @Prop()
  maxValue: string;

  @Prop()
  stdValue: string;

  @Prop()
  mandatory: boolean;
}

export const StandardDataSchema = SchemaFactory.createForClass(StandardData);

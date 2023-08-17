import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProcessControlTimeDocument = ProcessControlTime & Document;

@Schema()
export class ProcessControlTime {
  @Prop()
  time: string;

  @Prop()
  qualityChecking: any[] // edit here
}

export const ProcessControlTimeSchema =
  SchemaFactory.createForClass(ProcessControlTime);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProcessControlShiftDocument = ProcessControlShift & Document;

@Schema()
export class ProcessControlShift {

  @Prop()
  origin: string

  @Prop()
  type: string;

  @Prop()
  times: any[] // edit here

  @Prop()
  createdBy: string;

  @Prop()
  status: string;
}

export const ProcessControlShiftSchema =
  SchemaFactory.createForClass(ProcessControlShift);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProcessControlTimeDocument } from './process-control-time.schema';

export type ProcessControlShiftDocument = ProcessControlShift & Document;

@Schema()
export class ProcessControlShift {
  @Prop()
  origin: string;

  @Prop()
  type: string;

  @Prop({ type: [{ type: String, ref: 'ProcessControlTime' }] })
  times: ProcessControlTimeDocument['id'][];

  @Prop()
  createdBy: string;

  @Prop()
  status: string;
}

export const ProcessControlShiftSchema =
  SchemaFactory.createForClass(ProcessControlShift);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProcessControlShiftDocument } from './process-control-shift.schema';

export type ProcessControlMainDocument = ProcessControlMain & Document;

@Schema()
export class ProcessControlMain {
  @Prop()
  number: number;

  @Prop()
  requestCode: string;

  @Prop()
  itemCode: string;

  @Prop()
  itemName: string;

  @Prop()
  batch: string;

  @Prop()
  date: string;

  @Prop({ type: [{ type: String, ref: 'ProcessControlShift' }] })
  shifts: ProcessControlShiftDocument['_id'][];
}

export const ProcessControlMainSchema =
  SchemaFactory.createForClass(ProcessControlMain);

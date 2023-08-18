import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TimeSlotDocument = TimeSlot & Document;

@Schema()
export class TimeSlot {
  @Prop()
  category: string;

  @Prop()
  shift: string;

  @Prop()
  times: any[]
}

export const TimeSlotSchema =
  SchemaFactory.createForClass(TimeSlot);

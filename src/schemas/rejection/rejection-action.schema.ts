import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RejectionActionDocument = RejectionAction & Document;

@Schema()
export class RejectionAction {

  @Prop()
  action: string;

  @Prop()
  from: string;

  @Prop()
  date: string;

  @Prop()
  type: number;

  @Prop()
  status: string;
}

export const RejectionActionSchema = SchemaFactory.createForClass(RejectionAction);

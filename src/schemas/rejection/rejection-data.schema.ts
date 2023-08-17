import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RejectionActionDocument } from './rejection-action.schema';

export type RejectionDataDocument = RejectionData & Document;

@Schema()
export class RejectionData {
  @Prop()
  origin: string;

  @Prop()
  rejectedDate: string;

  @Prop()
  rejectCode: string;

  @Prop()
  round: string;

  @Prop()
  status: string;

  @Prop({ type: [{ type: String, ref: 'RejectionAction' }] })
  rejectionSetting: RejectionActionDocument['_id'][];
}

export const RejectionDataSchema = SchemaFactory.createForClass(RejectionData);

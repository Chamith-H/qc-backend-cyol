import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EquipmentDocument } from './equipment.schema';

export type QcParameterDocument = Inspection & Document;

@Schema()
export class Inspection {
  @Prop()
  number: number;

  @Prop()
  requestId: string;

  @Prop({type: String, ref: 'Basedoc'})
  baseDocId: EquipmentDocument['_id'] // change to base doc details

  @Prop()
  itemCode: string;

  @Prop()
  batch: number;

  @Prop()
  stage: string;

  @Prop()
  qualityChecking: string;

  @Prop()
  quantity: string;
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);
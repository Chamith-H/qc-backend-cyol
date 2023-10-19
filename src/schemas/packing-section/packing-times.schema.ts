import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackingTimeDocument = PackingTime & Document;

@Schema()
export class PackingTime {
  @Prop()
  originReq: string;

  @Prop()
  machine: string;

  @Prop()
  time: string;

  @Prop()
  item: string;

  @Prop()
  batch: string;

  @Prop()
  size: string;

  @Prop()
  mfg: string;

  @Prop()
  exp: string;

  @Prop()
  bc: string;

  @Prop()
  operator: string;

  @Prop()
  supervisor: string;

  @Prop()
  initial: string;

  @Prop()
  packWeight: string;

  @Prop()
  sealingQuality: string;

  @Prop()
  printQuality: string;

  @Prop()
  iMark: string;

  @Prop()
  metalDetect: string;

  @Prop()
  checked: string;
}

export const PackingTimeSchema = SchemaFactory.createForClass(PackingTime);

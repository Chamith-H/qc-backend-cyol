import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackingMainDocument = PackingMain & Document;

@Schema()
export class PackingMain {
  @Prop()
  number: number;

  @Prop()
  requestNo: string;

  @Prop()
  date: string;

  @Prop()
  checkedStatus: string;

  @Prop()
  machines: any[];
}

export const PackingMainSchema = SchemaFactory.createForClass(PackingMain);

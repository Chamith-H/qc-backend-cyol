import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackingMachineDocument = PackingMachine & Document;

@Schema()
export class PackingMachine {
  @Prop()
  name: string;

  @Prop()
  code: string;
}

export const PackingMachineSchema =
  SchemaFactory.createForClass(PackingMachine);

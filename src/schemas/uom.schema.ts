import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UomDocument = Uom & Document

@Schema()
export class Uom {
    @Prop()
    name: string;

    @Prop()
    symbol: string
}

export const UomSchema = SchemaFactory.createForClass(Uom);
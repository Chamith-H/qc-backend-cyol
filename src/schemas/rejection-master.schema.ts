import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RejectionDocument = Rejection & Document

@Schema()
export class Rejection {
    @Prop()
    code: string;

    @Prop()
    name: string
}

export const RejectionSchema = SchemaFactory.createForClass(Rejection)
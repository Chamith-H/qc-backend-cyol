import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CancellationDocument = Cancellation & Document

@Schema()
export class Cancellation {
    @Prop()
    code: string;

    @Prop()
    name: string
}

export const CancellationSchema = SchemaFactory.createForClass(Cancellation)
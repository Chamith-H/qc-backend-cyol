import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BatchOriginDocument = BatchOrigin & Document;

@Schema()
export class BatchOrigin {
  @Prop()
  currentNo: number;
}

export const BatchOriginSchema = SchemaFactory.createForClass(BatchOrigin);

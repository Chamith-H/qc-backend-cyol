import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocOriginDocument = DocOrigin & Document;

@Schema()
export class DocOrigin {
  @Prop()
  baseDocNo: string;

  @Prop()
  baseDocType: string;

  @Prop()
  refDocNo: string;

  @Prop()
  refDocType: string;

  @Prop()
  itemCode: string;

  @Prop()
  line: number;

  @Prop()
  qcRequest: string;

  @Prop()
  newRequest: string;

  @Prop()
  transferor: string;

  @Prop()
  transferDate: string;
}

export const DocOriginSchema = SchemaFactory.createForClass(DocOrigin);

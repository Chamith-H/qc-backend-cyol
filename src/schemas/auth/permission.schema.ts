import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop()
  number: number;

  @Prop()
  permission: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
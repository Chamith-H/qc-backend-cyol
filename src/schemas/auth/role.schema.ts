import { PermissionDocument } from './permission.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop()
  roleName: string;

  @Prop({ type: [{ type: String, ref: 'Permission' }] })
  permissions: PermissionDocument['_id'][];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

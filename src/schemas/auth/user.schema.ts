import { RoleDocument, RoleSchema } from 'src/schemas/auth/role.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userID: string;

  @Prop()
  name: string;

  @Prop({ type: String, ref: 'Role' })
  role: RoleDocument['_id'];

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

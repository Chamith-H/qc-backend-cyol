import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class EditEquipmentDto {
  @IsNotEmpty()
  id: ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;
}

import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class EditUomDto {
  @IsNotEmpty()
  id: ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  symbol: string;
}

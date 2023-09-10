import { IsNotEmpty, IsString } from 'class-validator';

export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

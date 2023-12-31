import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  userID: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

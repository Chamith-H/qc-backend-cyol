import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStandardDataDto {
  @IsNotEmpty()
  @IsString()
  parameter: string;

  @IsNotEmpty()
  @IsString()
  minValue: string;

  @IsNotEmpty()
  @IsString()
  maxValue: string;

  @IsNotEmpty()
  @IsString()
  stdValue: string;
}

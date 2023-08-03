import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStandardDataDto {
  @IsNotEmpty()
  @IsString()
  parameterId: string;

  @IsNotEmpty()
  @IsString()
  minValue: string;

  @IsNotEmpty()
  @IsString()
  maxValue: string;

  @IsNotEmpty()
  @IsString()
  stdValue: string;

  mandatory: boolean
}

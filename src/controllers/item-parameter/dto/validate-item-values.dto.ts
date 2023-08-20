import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateItemValueDto {
  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  minValue: any;

  @IsNotEmpty()
  maxValue: any;

  @IsNotEmpty()
  stdValue: any;

  @IsNotEmpty()
  compareValue: any;
}

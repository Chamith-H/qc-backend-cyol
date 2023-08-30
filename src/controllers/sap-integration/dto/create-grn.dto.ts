import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGRNDto {
  @IsNotEmpty()
  @IsString()
  session: string;

  @IsNotEmpty()
  po: string

  @IsNotEmpty()
  line: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  batch: string
}

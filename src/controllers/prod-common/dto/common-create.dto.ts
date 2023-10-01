import { IsNotEmpty, IsString } from 'class-validator';
export class CommonCreateDto {
  @IsNotEmpty()
  shift: string;

  @IsNotEmpty()
  category: string;
}

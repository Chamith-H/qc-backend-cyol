import { IsNotEmpty } from 'class-validator';
export class ExistFinderDto {
  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  origin: string;
}

import { IsNotEmpty } from 'class-validator';

export class FilterPackingDto {
  @IsNotEmpty()
  requestNo: string;

  @IsNotEmpty()
  date: string;
}

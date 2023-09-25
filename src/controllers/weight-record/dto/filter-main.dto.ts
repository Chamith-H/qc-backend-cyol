import { IsNotEmpty, IsString } from 'class-validator';
export class FilterMainDto {
  @IsNotEmpty()
  requestNo: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  checkedStatus: string;
}

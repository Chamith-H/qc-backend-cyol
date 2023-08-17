import { IsNotEmpty } from 'class-validator';

export class FilterRejectListDto {
  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  rejectNo: string;

  @IsNotEmpty()
  inspectNo: string;
}

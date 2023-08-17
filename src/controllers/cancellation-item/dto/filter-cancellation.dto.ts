import { IsNotEmpty } from 'class-validator';
export class FilterCancellationDto {
  @IsNotEmpty()
  batchNo: string;

  @IsNotEmpty()
  cancellationNo: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  baseDocNo: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  transaction: string;
}

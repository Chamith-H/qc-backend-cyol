import { IsNotEmpty } from 'class-validator';

export class FilterWhsTransactionDto {
  @IsNotEmpty()
  transferNo: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  transaction: string;

  @IsNotEmpty()
  fromWarehouse: string;

  @IsNotEmpty()
  asignedDate: string;
}

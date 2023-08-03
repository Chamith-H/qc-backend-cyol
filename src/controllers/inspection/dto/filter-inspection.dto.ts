import { IsNotEmpty } from 'class-validator';
export class FilterInspectionDto {
  @IsNotEmpty()
  qcStatus: string;

  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  requestId: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  warehouse: string;

  @IsNotEmpty()
  baseDoc: string;

  @IsNotEmpty()
  transaction: string;

  @IsNotEmpty()
  date: any;
}

import { IsNotEmpty } from 'class-validator';

export class FilterWhsReportDto {
  @IsNotEmpty()
  transferNo: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  fromWarehouse: string;

  @IsNotEmpty()
  toWarehouse: string;

  @IsNotEmpty()
  transferDate: string;
}

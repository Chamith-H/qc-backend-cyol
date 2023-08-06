import { IsNotEmpty } from 'class-validator';

export class FilterWeighBridgeDto {
  @IsNotEmpty()
  requestNo: string;

  @IsNotEmpty()
  tokenNo: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  transaction: string;
}

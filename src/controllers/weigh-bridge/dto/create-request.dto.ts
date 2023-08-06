import { IsNotEmpty } from 'class-validator';

export class WeighBridgeRequestDto {
  @IsNotEmpty()
  tokenNo: string;

  @IsNotEmpty()
  po: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  line: number;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  date: string;
}

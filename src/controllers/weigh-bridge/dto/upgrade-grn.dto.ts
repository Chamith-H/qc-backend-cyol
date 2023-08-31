import { IsNotEmpty } from 'class-validator';

export class UpgradeGrnDto {
  @IsNotEmpty()
  requestId: string;

  @IsNotEmpty()
  transaction: string;

  @IsNotEmpty()
  wastage: string;

  @IsNotEmpty()
  warehouse: string;
}

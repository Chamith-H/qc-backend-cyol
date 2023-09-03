import { IsNotEmpty } from 'class-validator';

export class UpdateWhsTransactionDto {
  @IsNotEmpty()
  transferId: string;

  @IsNotEmpty()
  transferBy: string;

  @IsNotEmpty()
  transferDate: string;

  @IsNotEmpty()
  toWarehouse: string;
}

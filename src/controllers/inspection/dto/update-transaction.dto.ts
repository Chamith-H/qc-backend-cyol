import { IsNotEmpty } from 'class-validator';
export class UpdateTransactionDto {
  @IsNotEmpty()
  inspectId: string;

  @IsNotEmpty()
  inspectCode: string;

  @IsNotEmpty()
  docOrigin: string;

  @IsNotEmpty()
  qcStatus: string;

  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  baseDocNo: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  transaction: string;

  @IsNotEmpty()
  transferor: string;

  @IsNotEmpty()
  transactionDate: string;
}

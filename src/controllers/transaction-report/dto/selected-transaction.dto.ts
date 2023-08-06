import { IsNotEmpty } from 'class-validator';

export class SelectedTransactionDto {
  @IsNotEmpty()
  requestCode: string;

  @IsNotEmpty()
  requestNo: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateWhsTransactionDto {
  @IsNotEmpty()
  origin: any;
}

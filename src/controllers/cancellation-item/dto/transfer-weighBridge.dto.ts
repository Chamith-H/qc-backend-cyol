import { IsNotEmpty } from 'class-validator';
export class TransferWeighbridgeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  transferDate: string;

  @IsNotEmpty()
  transaction: string

  @IsNotEmpty()
  transferedBy: string;
}
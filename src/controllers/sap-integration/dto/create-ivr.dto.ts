import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIVRDto {
  @IsNotEmpty()
  ItemCode: string;

  @IsNotEmpty()
  WarehouseCode: number;

  @IsNotEmpty()
  FromWarehouseCode: number;

  @IsNotEmpty()
  Quantity: number;

  @IsNotEmpty()
  SerialNumber: string;
}

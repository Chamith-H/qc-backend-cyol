import { IsNotEmpty, IsString } from 'class-validator';

export class FilterTokenDto {
  @IsNotEmpty()
  tokenId: string;

  @IsNotEmpty()
  poNumber: string;

  @IsNotEmpty()
  supplier: string;

  @IsNotEmpty()
  vehicle: string;

  @IsNotEmpty()
  driver: string;
}

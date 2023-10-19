import { IsNotEmpty } from 'class-validator';

export class UpdatePendingDto {
  @IsNotEmpty()
  iMark: string;

  @IsNotEmpty()
  metalDetect: string;

  @IsNotEmpty()
  packWeight: string;

  @IsNotEmpty()
  printQuality: string;

  @IsNotEmpty()
  sealingQuality: string;
}

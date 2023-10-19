import { IsNotEmpty } from 'class-validator';

export class UpdateInitialDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  item: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  mfg: string;

  @IsNotEmpty()
  exp: string;

  @IsNotEmpty()
  bc: string;

  @IsNotEmpty()
  operator: string;

  @IsNotEmpty()
  supervisor: string;
}

import { IsNotEmpty } from 'class-validator';
export class CreateCancellationDto {
  @IsNotEmpty()
  docOrigin: string;

  @IsNotEmpty()
  cancelDate: string;

  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  baseDocNo: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batchNo: string;

  @IsNotEmpty()
  code: string;
}

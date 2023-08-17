import { IsNotEmpty } from 'class-validator';

export class CreateRejectListDto {
  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  baseDoc: string;

  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  round: string;

  @IsNotEmpty()
  rejectNo: string;

  @IsNotEmpty()
  inspectNo: string;
}

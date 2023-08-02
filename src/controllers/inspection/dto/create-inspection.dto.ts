import { IsNotEmpty } from 'class-validator';
export class CreateInspectionDto {
  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  baseDoc: string;
}

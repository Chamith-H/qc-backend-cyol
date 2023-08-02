import { IsNotEmpty } from 'class-validator';

export class InspectionParameterDto {
  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  stage: string;
}

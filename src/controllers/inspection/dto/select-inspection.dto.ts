import { IsNotEmpty } from 'class-validator';
export class SelectInspectionDto {
  @IsNotEmpty()
  inspectId: string;
}

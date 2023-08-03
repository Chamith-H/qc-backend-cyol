import { IsNotEmpty } from 'class-validator';
export class CreateInspectionDto {
  @IsNotEmpty()
  docOrigin: string;
}

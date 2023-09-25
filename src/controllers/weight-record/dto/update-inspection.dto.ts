import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateInspectionDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  batch: string;

  @IsOptional()
  remarks: string;

  @IsOptional()
  status: string;

  @IsNotEmpty()
  checkedBy: string;
}

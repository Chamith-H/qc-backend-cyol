import { IsNotEmpty } from 'class-validator';
export class UpdateStatusDto {
  @IsNotEmpty()
  inspectId: string;

  @IsNotEmpty()
  qcStatus: string;

  @IsNotEmpty()
  inspector: string;

  @IsNotEmpty()
  inspectionDate: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  remarks: string;

  @IsNotEmpty()
  code: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  requestNo: string;

  @IsNotEmpty()
  requestCode: string

  @IsNotEmpty()
  transferTo: string;

  @IsNotEmpty()
  newRequest: string;
}

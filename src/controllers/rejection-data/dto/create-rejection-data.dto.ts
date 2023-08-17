import { IsNotEmpty } from 'class-validator';
export class CreateRejectionDataDto {
  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  rejectedDate: string;

  @IsNotEmpty()
  rejectCode: string;
}
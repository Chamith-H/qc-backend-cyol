import { IsNotEmpty } from 'class-validator';
export class CreateRejectionItemDto {
  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;

  @IsNotEmpty()
  stage: string;

  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  rejectedDate: string;

  @IsNotEmpty()
  rejectCode: string;
}

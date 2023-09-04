import { IsNotEmpty } from 'class-validator';

export class UpdateProcessStatusDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  changedBy: string;

  @IsNotEmpty()
  changedDate: string;
}

import { IsNotEmpty } from 'class-validator';

export class UpdateRejectActionDto {
  @IsNotEmpty()
  rejectId: string;
}
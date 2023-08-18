import { IsNotEmpty, IsString } from 'class-validator';

export class SelectedTimeSlotDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  shift: string;
}

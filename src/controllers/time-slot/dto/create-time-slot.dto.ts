import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTimeSlotDto {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  shift: string;

  @IsNotEmpty()
  times: any[];
}

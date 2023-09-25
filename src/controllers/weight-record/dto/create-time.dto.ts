import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTimeDto {

  @IsNotEmpty()
  shiftId: string;

  @IsNotEmpty()
  time: string;
}

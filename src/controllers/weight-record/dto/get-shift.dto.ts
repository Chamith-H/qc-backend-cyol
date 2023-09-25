import { IsNotEmpty, IsString } from 'class-validator';
export class GetShiftDto {
  @IsNotEmpty()
  id: string;
}

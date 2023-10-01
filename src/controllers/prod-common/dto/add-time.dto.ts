import { IsNotEmpty, IsString } from 'class-validator';
export class AddTimeDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  stage: string;
}

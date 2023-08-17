import { IsNotEmpty } from 'class-validator';
export class CreateRejectActionDto {
  @IsNotEmpty()
  action: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  type: number;

  @IsNotEmpty()
  status: string;
}

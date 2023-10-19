import { IsNotEmpty } from 'class-validator';

export class PackingTimeDto {
  @IsNotEmpty()
  originReq: string;

  @IsNotEmpty()
  machine: string;

  @IsNotEmpty()
  time: string;
}

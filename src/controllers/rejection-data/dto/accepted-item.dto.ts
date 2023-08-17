import { IsNotEmpty } from 'class-validator';
export class AcceptedItemDto {
  @IsNotEmpty()
  originDoc: string;

  @IsNotEmpty()
  date: string;
}

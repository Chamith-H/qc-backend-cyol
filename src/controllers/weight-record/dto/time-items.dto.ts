import { IsNotEmpty, IsString } from 'class-validator';
export class TimeItemsDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  item: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
export class CreateItemDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  item: string;

  @IsNotEmpty()
  batch: string;
}

import { IsNotEmpty } from 'class-validator';
export class DeleteByOneDto {
  @IsNotEmpty()
  id: string;
}

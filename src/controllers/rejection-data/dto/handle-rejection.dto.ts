import { IsNotEmpty } from 'class-validator';
export class HandleRejectionDto {
  @IsNotEmpty()
  originDoc: string;

  @IsNotEmpty()
  currentDoc: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  date: string;
}

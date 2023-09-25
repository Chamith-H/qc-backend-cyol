import { IsNotEmpty, IsString } from 'class-validator';
export class AddNewRecordDto {
  @IsNotEmpty()
  shift: string;
}

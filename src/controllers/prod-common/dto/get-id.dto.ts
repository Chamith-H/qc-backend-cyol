import { IsNotEmpty, IsString } from 'class-validator';
export class GetIdDto {
  @IsNotEmpty()
  id: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateTokenPDFDto {
  @IsNotEmpty()
  data: any;
}

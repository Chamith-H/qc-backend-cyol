import { IsNotEmpty } from 'class-validator';

export class EditCancellationMasterDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;
}

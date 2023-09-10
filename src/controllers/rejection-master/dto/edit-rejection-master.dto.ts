import { IsNotEmpty } from 'class-validator';

export class EditRejectionMasterDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;
}

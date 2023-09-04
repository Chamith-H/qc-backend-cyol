import { IsNotEmpty } from 'class-validator';

export class UpdateVerifiedDataDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  verifiedBy: string;

  @IsNotEmpty()
  verifiedDate: string;
}

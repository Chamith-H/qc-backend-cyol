import { IsNotEmpty } from 'class-validator';

export class UpdateWeightQuantityDto {
  @IsNotEmpty()
  requestId: string;

  @IsNotEmpty()
  itemWeight: string
}

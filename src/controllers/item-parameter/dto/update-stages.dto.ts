import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStageDto {
  @IsNotEmpty()
  @IsString()
  itemCode: string;

  @IsNotEmpty()
  stages: string[];
}

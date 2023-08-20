import { IsNotEmpty, IsString } from 'class-validator';

export class SelectedStageDto {
  @IsNotEmpty()
  stage: string
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStageDto {
    @IsNotEmpty()
    @IsString()
    stageName: string;

    @IsNotEmpty()
    parameterData: string[];
}
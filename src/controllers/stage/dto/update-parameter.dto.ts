import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateParameterDto {
    @IsNotEmpty()
    @IsString()
    stageId: string;

    @IsNotEmpty()
    parameterData: string[];
}
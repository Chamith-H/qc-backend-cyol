import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class DataDto {
    @IsNotEmpty()
    @IsString()
    parameter: string;

    @IsNotEmpty()
    @IsString()
    minValue: string;
  
    @IsNotEmpty()
    @IsString()
    maxValue: string;
  
    @IsNotEmpty()
    @IsString()
    stdValue: string;
}

class StageDto {
    @IsNotEmpty()
    @IsString()
    stageName: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => DataDto)
    parameterData: DataDto[];
}
export class CreateItemParameterDto {
    @IsNotEmpty()
    item: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => StageDto)
    stage: StageDto;
}

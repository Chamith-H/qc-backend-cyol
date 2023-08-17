import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class DataDto {
    @IsString()
    token:string

    @IsNotEmpty()
    line: number
}

export class CreateTokenDto {
    @IsNotEmpty()
    poNumber: string;

    @IsNotEmpty()
    supplier: string

    @IsNotEmpty()
    driver: string

    @IsNotEmpty()
    vehicle: string

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => DataDto)
    items: DataDto[]

    @IsNotEmpty()
    date: string
}
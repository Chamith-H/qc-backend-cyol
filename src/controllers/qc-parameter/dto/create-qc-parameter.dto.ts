import { IsNotEmpty } from "class-validator";

export class CreateQcParameterDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    value: string

    @IsNotEmpty()
    uom: string

    @IsNotEmpty()
    equipment: string
}
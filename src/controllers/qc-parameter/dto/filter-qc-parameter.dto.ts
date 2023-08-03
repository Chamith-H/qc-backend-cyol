import { IsNotEmpty } from "class-validator";

export class FilterQcParameterDto {
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    value: string
}
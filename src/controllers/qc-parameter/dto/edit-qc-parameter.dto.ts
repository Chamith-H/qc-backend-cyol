import { IsNotEmpty } from "class-validator";

export class EditQcParameterDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    uom: string

    @IsNotEmpty()
    equipment: string
}
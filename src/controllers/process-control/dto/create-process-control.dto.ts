import { IsNotEmpty } from "class-validator";

export class CreateProcessControlDto {
    @IsNotEmpty()
    itemCode: string;

    @IsNotEmpty()
    itemName: string

    @IsNotEmpty()
    shift: string

    @IsNotEmpty()
    date: string

    @IsNotEmpty()
    createdBy: string
}
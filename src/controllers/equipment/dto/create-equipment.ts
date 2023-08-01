import { IsNotEmpty } from "class-validator";

export class CreateEquipmentDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    code: string
}
import { IsNotEmpty } from "class-validator";

export class CreateTimeProcessDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    itemCode: string;

    @IsNotEmpty()
    time: string;
}
import { IsNotEmpty } from "class-validator";

export class CreatedRequestDto {
    @IsNotEmpty()
    originId: string;

    @IsNotEmpty()
    qcRequest: string

    @IsNotEmpty()
    newRequest: string

    @IsNotEmpty()
    transferor: string

    @IsNotEmpty()
    transferDate: string
}
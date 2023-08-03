import { IsNotEmpty } from "class-validator";

export class CreateRejectionMasterDto {
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    name: string;
}
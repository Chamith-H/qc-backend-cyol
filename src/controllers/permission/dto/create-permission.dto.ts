import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @IsNotEmpty()
    number: string;

    @IsNotEmpty()
    permission: string
}
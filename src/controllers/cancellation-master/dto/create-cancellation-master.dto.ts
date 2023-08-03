import { IsNotEmpty } from "class-validator";

export class CreateCancellationDto {
    @IsNotEmpty()
    code: string

    @IsNotEmpty()
    name: string;
}
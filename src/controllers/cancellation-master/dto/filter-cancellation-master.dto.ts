import { IsNotEmpty } from "class-validator";

export class FilterCancellationDto {
    @IsNotEmpty()
    code: string
}
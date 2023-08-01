import { IsNotEmpty } from "class-validator";

export class CreateObservedDataDto {
    @IsNotEmpty()
    standardDataId: string;
}
import { IsNotEmpty } from "class-validator";

export class CreateInspectionDto {
    @IsNotEmpty()
    baseDocId: string;

    @IsNotEmpty()
    itemParameterId: string;

    @IsNotEmpty()
    stage: string
}
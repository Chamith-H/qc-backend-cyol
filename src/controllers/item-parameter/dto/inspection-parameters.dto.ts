import { IsNotEmpty } from "class-validator";

export class InspectionParameterDto {
    @IsNotEmpty()
    itemParameterId: string;

    @IsNotEmpty()
    stage: string
}
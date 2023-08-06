import { IsNotEmpty } from "class-validator";

export class UpdateObservedDataDto {
    @IsNotEmpty()
    docId: string;

    @IsNotEmpty()
    observedValue: string;

    @IsNotEmpty()
    checker: string;

    @IsNotEmpty()
    checkedDate: string;
}
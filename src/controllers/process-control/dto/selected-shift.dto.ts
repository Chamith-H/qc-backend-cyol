import { IsNotEmpty } from "class-validator";

export class SelectedShiftDto {
    @IsNotEmpty()
    shiftId: string;
}
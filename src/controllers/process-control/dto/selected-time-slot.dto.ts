import { IsNotEmpty } from "class-validator";

export class SelectedTimeSlotDto {
    @IsNotEmpty()
    slotId: string;
}
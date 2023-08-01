import { IsNotEmpty } from "class-validator";

export class SelectedItemDto {
    @IsNotEmpty()
    id: string;
}
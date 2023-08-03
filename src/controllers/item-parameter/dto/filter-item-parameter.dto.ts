import { IsNotEmpty } from "class-validator";

export class FilterItemDto {
    @IsNotEmpty()
    itemCode: string;
}
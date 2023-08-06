import { IsNotEmpty } from "class-validator";

export class FilterRejectionMasterDto {
    @IsNotEmpty()
    code: string
}
import { IsNotEmpty } from "class-validator";

export class SelectedProcessControlDto {
    @IsNotEmpty()
    requestCode: string;
}
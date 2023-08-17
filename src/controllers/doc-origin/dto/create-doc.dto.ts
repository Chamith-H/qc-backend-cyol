import { IsNotEmpty } from "class-validator";

export class CreateDocDto {
    @IsNotEmpty()
    baseDocNo: string;

    @IsNotEmpty()
    baseDocType: string

    @IsNotEmpty()
    refDocNo: string

    @IsNotEmpty()
    refDocType: string

    @IsNotEmpty()
    itemCode: string

    @IsNotEmpty()
    line: number

    @IsNotEmpty()
    qcRequest: string

    @IsNotEmpty()
    newRequest: string

    @IsNotEmpty()
    transferor: string

    @IsNotEmpty()
    transferDate: string
}
import { IsNotEmpty } from 'class-validator';
export class FilterRejectionItemDto {
  @IsNotEmpty()
  rejectionNo: string;
  
  @IsNotEmpty()
  itemCode: string;

  @IsNotEmpty()
  batch: string;
}

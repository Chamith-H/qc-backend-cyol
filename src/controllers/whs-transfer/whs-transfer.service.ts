import { Injectable } from '@nestjs/common';
import { CreateWhsTransactionDto } from './whs-transfer.dto';

@Injectable()
export class WhsTransferService {
    async create_whsRequest(dto: CreateWhsTransactionDto) {
        console.log(dto)
    }
}

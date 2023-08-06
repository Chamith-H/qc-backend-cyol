import { Controller, Post, Body } from '@nestjs/common';
import { TransactionReportService } from './transaction-report.service';
import { SelectedTransactionDto } from './transaction-report.dto';

@Controller('transaction-report')
export class TransactionReportController {
    constructor(private readonly reportService: TransactionReportService) {}

    @Post('selected')
    async selectedTransaction(@Body() dto: SelectedTransactionDto) {
        return await this.reportService.get_selectedTransaction(dto)
    }
}

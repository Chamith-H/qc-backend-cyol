import { Controller, Post, Body, Get } from '@nestjs/common';
import { WhsTransferService } from './whs-transfer.service';
import {
  FilterWhsReportDto,
  FilterWhsTransactionDto,
  UpdateWhsTransactionDto,
} from './whs-transfer.dto';

@Controller('whs-transfer')
export class WhsTransferController {
  constructor(private readonly whsTransferService: WhsTransferService) {}

  @Post('all')
  async getTransactions(@Body() dto: FilterWhsTransactionDto) {
    return await this.whsTransferService.get_allTransactions(dto);
  }

  @Post('report')
  async getTransferReports(@Body() dto: FilterWhsReportDto) {
    return await this.whsTransferService.get_transactionReports(dto);
  }

  @Post('update-transaction')
  async updateWhsTransaction(@Body() dto: UpdateWhsTransactionDto) {
    return await this.whsTransferService.update_warehouseTransaction(dto);
  }

  @Get('wareHouses')
  async get_warehouseList() {
    const wareHouses = [
      {
        name: 'Silo-1',
        code: 'Silo-1',
      },

      {
        name: 'Silo-2',
        code: 'Silo-2',
      },

      {
        name: 'Silo-3',
        code: 'Silo-3',
      },

      {
        name: 'Silo-4',
        code: 'Silo-4',
      },

      {
        name: 'Commodity warehouse',
        code: 'Com-whs',
      },

      {
        name: 'RM WH PL1',
        code: 'RM-WH-PL1',
      },

      {
        name: 'RM WH PL2',
        code: 'RM-WH-PL2',
      },

      {
        name: 'MRO-WH',
        code: 'MRO-WH',
      },
    ];

    return await wareHouses;
  }
}

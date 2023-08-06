import { Controller, Post, Get, Body } from '@nestjs/common';
import { CancellationMasterService } from './cancellation-master.service';
import { CreateCancellationDto, FilterCancellationDto } from './cancellation-master.dto';

@Controller('cancellation-master')
export class CancellationMasterController {
    constructor(private readonly cancellationMasterService: CancellationMasterService) {}

    @Post('add')
    async addCancellation(@Body() dto: CreateCancellationDto) {
        return await this.cancellationMasterService.add_newCancellationMaster(dto)
    }

    @Post('all')
    async getCancellations(@Body() dto: FilterCancellationDto) {
        return await this.cancellationMasterService.get_allCancellations(dto)
    }
}

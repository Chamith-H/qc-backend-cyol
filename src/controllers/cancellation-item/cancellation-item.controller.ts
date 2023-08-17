import { Controller, Post, Body } from '@nestjs/common';
import { CancellationItemService } from './cancellation-item.service';
import { FilterCancellationDto, TransferWeighbridgeDto } from './cancellation-item.dto';

@Controller('cancellation-item')
export class CancellationItemController {
    constructor(private readonly cancellationItemService: CancellationItemService) {}

    @Post('all')
    async getAllCancelledItems(@Body() dto: FilterCancellationDto) {
        return await this.cancellationItemService.get_allCancellationData(dto)
    }

    @Post('transfer')
    async actionToTransfer(@Body() dto: TransferWeighbridgeDto) {
        return await this.cancellationItemService.transfer_weighBridge(dto)
    }
}

import { Controller, Body, Post } from '@nestjs/common';
import { RejectionItemService } from './rejection-item.service';
import { FilterRejectionItemDto } from './rejection-item.dto';

@Controller('rejection-item')
export class RejectionItemController {
    constructor(private readonly rejectionItemService: RejectionItemService) {}

    @Post('all')
    async getRejectedItems(@Body() dto: FilterRejectionItemDto) {
        return await this.rejectionItemService.get_allRejections(dto)
    }
}

import { Controller, Post, Body } from '@nestjs/common';
import { ObservedDataService } from './observed-data.service';
import { UpdateObservedDataDto } from './observed-data.dto';

@Controller('observed-data')
export class ObservedDataController {
    constructor(private readonly observedDataService: ObservedDataService) {}

    @Post('update')
    async updateOvservedData(@Body() dto: UpdateObservedDataDto) {
        console.log(dto)
        return await this.observedDataService.update_ObservedData(dto)
    }
} 

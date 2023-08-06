import { Controller, Post, Body } from '@nestjs/common';
import { WeighBridgeService } from './weigh-bridge.service';
import { FilterWeighBridgeDto } from './weigh-bridge.dto';

@Controller('weigh-bridge')
export class WeighBridgeController {
    constructor(private readonly weighbridgeService: WeighBridgeService) {}

    @Post('all')
    async getAllWeighbrighes(@Body() dto: FilterWeighBridgeDto) {
        return await this.weighbridgeService.get_allWeighBridges(dto)
    }
}

import { Controller, Post, Body } from '@nestjs/common';
import { WeighBridgeService } from './weigh-bridge.service';
import { FilterWeighBridgeDto, UpdateWeightQuantityDto } from './weigh-bridge.dto';

@Controller('weigh-bridge')
export class WeighBridgeController {
    constructor(private readonly weighbridgeService: WeighBridgeService) {}

    @Post('all')
    async getAllWeighbrighes(@Body() dto: FilterWeighBridgeDto) {
        return await this.weighbridgeService.get_allWeighBridges(dto)
    }

    @Post('update-weight')
    async updateWeightQuantity(@Body() dto: UpdateWeightQuantityDto) {
        return await this.weighbridgeService.update_Weight(dto)
    }

    @Post('update')
    async createGRN(@Body() dto: UpdateWeightQuantityDto) {
        return await this.weighbridgeService.create_GRN(dto)
    }
}

import { Controller, Body, Get, Post } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './equipment.dto';

@Controller('equipment')
export class EquipmentController {
    constructor(private readonly equipmentService: EquipmentService) {}

    @Post('add')
    async createUom(@Body() dto: CreateEquipmentDto) {
        return await this.equipmentService.add_newEquipment(dto)
    }

    @Get('all')
    async getEquipments() {
        return await this.equipmentService.get_allEquipments()
    }
}

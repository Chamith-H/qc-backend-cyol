import { Controller, Post, Body } from '@nestjs/common';
import { CreateInspectionDto } from './inspection.dto';
import { InspectionService } from './inspection.service';

@Controller('inspection')
export class InspectionController {
    constructor(private readonly inspectionService: InspectionService) {}

    @Post('create')
    async createInspection(@Body() dto: CreateInspectionDto) {
        return await this.inspectionService.create_newInspection(dto)
    }
}

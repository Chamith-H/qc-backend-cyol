import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateInspectionDto, FilterInspectionDto } from './inspection.dto';
import { InspectionService } from './inspection.service';

@Controller('inspection')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Post('create')
  async createInspection(@Body() dto: CreateInspectionDto) {
    return await this.inspectionService.create_newInspection(dto);
  }

  @Post('all')
  async getInspections(@Body() dto: FilterInspectionDto) {
    return await this.inspectionService.get_allInspections(dto);
  }
}

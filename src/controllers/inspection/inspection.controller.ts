import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateInspectionDto, FilterInspectionDto, SelectInspectionDto, UpdateStatusDto, UpdateTransactionDto } from './inspection.dto';
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

  @Post('selected')
  async selectInspection(@Body() dto: SelectInspectionDto) {
    return await this.inspectionService.get_selectedInspection(dto)
  }

  @Post('update-status')
  async updateQcStatus(@Body() dto: UpdateStatusDto) {
    return await this.inspectionService.update_qcStatus(dto)
  }

  @Post('update-transaction')
  async updateTransaction(@Body() dto: UpdateTransactionDto) {
    return await this.inspectionService.update_Transaction(dto)
  }

  @Post('get-selecter') 
  async selectedMinimalData(@Body() dto: SelectInspectionDto) {
    return await this.inspectionService.get_minimalData(dto)
  }

  @Post('second-inspection')
  async createSecondInspection(@Body() dto: SelectInspectionDto) {
    return await this.inspectionService.create_newRequest_to_currentBatch(dto)
  }
}

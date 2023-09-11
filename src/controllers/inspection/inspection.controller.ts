import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import {
  CreateInspectionDto,
  FilterInspectionDto,
  SelectInspectionDto,
  UpdateStatusDto,
  UpdateTransactionDto,
} from './inspection.dto';
import { InspectionService } from './inspection.service';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

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

  @Get('all-inspections')
  async getAllRequests() {
    return await this.inspectionService.fetch_inspections();
  }

  @Post('selected')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(15))
  async selectInspection(@Body() dto: SelectInspectionDto) {
    return await this.inspectionService.get_selectedInspection(dto);
  }

  @Post('selected-transfer')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(18))
  async selectInspectionCheck(@Body() dto: SelectInspectionDto) {
    return await this.inspectionService.get_selectedInspection(dto);
  }

  @Post('update-status')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(17))
  async updateQcStatus(@Body() dto: UpdateStatusDto) {
    return await this.inspectionService.update_qcStatus(dto);
  }

  @Post('update-transaction')
  async updateTransaction(@Body() dto: UpdateTransactionDto) {
    return await this.inspectionService.update_Transaction(dto);
  }

  @Post('get-selecter')
  async selectedMinimalData(@Body() dto: SelectInspectionDto) {
    return await this.inspectionService.get_minimalData(dto);
  }

  @Post('second-inspection')
  async createSecondInspection(@Body() dto: SelectInspectionDto) {
    return await this.inspectionService.create_newRequest_to_currentBatch(dto);
  }

  @Get('count')
  async getRequestCounter() {
    return await this.inspectionService.get_inspectionCounter();
  }
}

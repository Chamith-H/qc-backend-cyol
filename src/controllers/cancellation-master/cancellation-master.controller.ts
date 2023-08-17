import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { CancellationMasterService } from './cancellation-master.service';
import {
  CreateCancellationDto,
  FilterCancellationDto,
} from './cancellation-master.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('cancellation-master')
export class CancellationMasterController {
  constructor(
    private readonly cancellationMasterService: CancellationMasterService,
  ) {}

  @Get('access')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard('5'))
  check_accessControl() {
    return { message: 'success' };
  }

  @Post('add')
  async addCancellation(@Body() dto: CreateCancellationDto) {
    return await this.cancellationMasterService.add_newCancellationMaster(dto);
  }

  @Post('all')
  async getCancellations(@Body() dto: FilterCancellationDto) {
    return await this.cancellationMasterService.get_allCancellations(dto);
  }
}

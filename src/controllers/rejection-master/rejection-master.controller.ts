import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { RejectionMasterService } from './rejection-master.service';
import {
  CreateRejectionMasterDto,
  FilterRejectionMasterDto,
} from './rejection-master.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('rejection-master')
export class RejectionMasterController {
  constructor(
    private readonly rejectionMasterService: RejectionMasterService,
  ) {}

  @Get('access')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard('4'))
  check_accessControl() {
    return { message: 'success' };
  }

  @Post('add')
  async addRejection(@Body() dto: CreateRejectionMasterDto) {
    return await this.rejectionMasterService.add_newRejectionMaster(dto);
  }

  @Post('all')
  async getRejections(@Body() dto: FilterRejectionMasterDto) {
    return await this.rejectionMasterService.get_allRejectionMasters(dto);
  }
}

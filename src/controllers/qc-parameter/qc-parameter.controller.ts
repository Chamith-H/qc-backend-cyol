import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { QcParameterService } from './qc-parameter.service';
import {
  CreateQcParameterDto,
  EditQcParameterDto,
  FilterQcParameterDto,
} from './qc-parameter.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('qc-parameter')
export class QcParameterController {
  constructor(private readonly qcParameterService: QcParameterService) {}

  @Get('access')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(2))
  check_Access() {
    return { message: 'Success' };
  }

  @Post('add')
  async addQcParameter(@Body() dto: CreateQcParameterDto) {
    return await this.qcParameterService.add_newQcParameter(dto);
  }

  @Post('all')
  async allQcParameters(@Body() dto: FilterQcParameterDto) {
    return await this.qcParameterService.get_allQcParameters(dto);
  }

  @Get('every')
  async everyQcParameters() {
    return this.qcParameterService.get_allQcParametersToSelect();
  }

  @Post('edit')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(6))
  async editQcParameter(@Body() dto: EditQcParameterDto) {
    return await this.qcParameterService.edit_qcParameter(dto);
  }
}

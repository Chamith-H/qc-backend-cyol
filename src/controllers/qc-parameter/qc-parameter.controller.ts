import { Controller, Body, Get, Post } from '@nestjs/common';
import { QcParameterService } from './qc-parameter.service';
import { CreateQcParameterDto } from './qc-parameter.dto';

@Controller('qc-parameter')
export class QcParameterController {
  constructor(private readonly qcParameterService: QcParameterService) {}

  @Post('add')
  async addQcParameter(@Body() dto: CreateQcParameterDto) {
    return await this.qcParameterService.add_newQcParameter(dto);
  }

  @Get('all')
  async allQcParameters() {
    return await this.qcParameterService.get_allQcParameters();
  }
}

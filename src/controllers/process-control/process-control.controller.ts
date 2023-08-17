import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProcessControlService } from './process-control.service';
import { CreateProcessControlDto, SelectedProcessControlDto } from './process-control.dto';

@Controller('process-control')
export class ProcessControlController {
  constructor(private readonly processControlService: ProcessControlService) {}

  @Post('create')
  async createProcessControl(@Body() dto: CreateProcessControlDto) {
    return await this.processControlService.create_processControlMain(dto)
  }

  @Get('process-all')
  async getProcessControlls() {
    return await this.processControlService.get_allProcessControls()
  }

  @Post('process-selected')
  async getSelectedProcess(@Body() dto: SelectedProcessControlDto) {
    return await this.processControlService.get_selectedProcess(dto)
  }
}

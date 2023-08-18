import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProcessControlService } from './process-control.service';
import { CreateProcessControlDto, CreateTimeProcessDto, SelectedProcessControlDto, SelectedTimeSlotDto, UpdateVerifiedDataDto } from './process-control.dto';
import { SelectedShiftDto } from './dto/selected-shift.dto';

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

  @Post('create-time')
  async createInspectTime(@Body() dto: CreateTimeProcessDto) {
    return await this.processControlService.create_inspectTime(dto)
  }

  @Post('shift-selected')
  async createNewShift(@Body() dto: SelectedShiftDto) {
    return await this.processControlService.get_selectedShift(dto)
  }

  @Post('slot-selected')
  async getTimeSlot(@Body() dto: SelectedTimeSlotDto) {
    return await this.processControlService.get_inspectionTimeSlot(dto)
  }

  @Post('update-verifier')
  async updateVerifier(@Body() dto: UpdateVerifiedDataDto) {
    return await this.processControlService.update_verifiedData(dto)
  }
}

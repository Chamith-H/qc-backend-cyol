import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { PackingSectionService } from './packing-section.service';
import {
  CreateMachineDto,
  FilterPackingDto,
  PackingTimeDto,
  UpdateInitialDto,
  UpdatePendingDto,
} from './packing-section.dto';

@Controller('packing-section')
export class PackingSectionController {
  constructor(private readonly packingSectionService: PackingSectionService) {}

  @Post('add-machine')
  async addMachine(@Body() dto: CreateMachineDto) {
    return await this.packingSectionService.add_newMachine(dto);
  }

  @Get('all-machines')
  async getMachines() {
    return await this.packingSectionService.get_allMachines();
  }

  @Get('new-main')
  async createRequest() {
    return await this.packingSectionService.create_newRequest();
  }

  @Post('get-requests')
  async getRequests(@Body() dto: FilterPackingDto) {
    return await this.packingSectionService.get_allRequests(dto);
  }

  @Post('new-time')
  async createTime(@Body() dto: PackingTimeDto) {
    return await this.packingSectionService.create_newTime(dto);
  }

  @Post('all-times')
  async getTimes(@Body() dto: PackingTimeDto) {
    console.log(dto);
    return await this.packingSectionService.get_allTimes(dto);
  }

  @Put('update-initial/:id')
  async updateInitials(@Param('id') id: string, @Body() dto: UpdateInitialDto) {
    return await this.packingSectionService.update_initialData(id, dto);
  }

  @Put('update-pending/:id')
  async updatePendings(@Param('id') id: string, @Body() dto: UpdatePendingDto) {
    return await this.packingSectionService.update_pendingData(id, dto);
  }

  @Get('complete/:id')
  async completeInspection(@Param('id') id: string) {
    return await this.packingSectionService.complete_currentRequest(id);
  }

  @Get('delete/:id')
  async deleteRequest(@Param('id') id: string) {
    return await this.packingSectionService.delete_curentRequest(id);
  }

  @Get('remove/:id')
  async removeMachine(@Param('id') id: string) {
    return await this.packingSectionService.remove_selectedMachine(id);
  }

  @Get('rem-time/:id')
  async removeTime(@Param('id') id: string) {
    return await this.packingSectionService.remove_inspectTime(id);
  }

  @Get('packing-items')
  async getPackings() {
    return await this.packingSectionService.get_packingItems();
  }
}

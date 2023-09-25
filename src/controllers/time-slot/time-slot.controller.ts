import { Controller, Post, Body, Get } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { SelectedTimeSlotDto } from '../process-control/process-control.dto';

@Controller('time-slot')
export class TimeSlotController {
  constructor(private readonly timeSlotService: TimeSlotService) {}

  @Get('create')
  async createSlot() {
    return await this.timeSlotService.create_timeSlot();
  }

  @Post('selected')
  async selectSlot(@Body() dto: SelectedTimeSlotDto) {
    return await this.timeSlotService.get_selectedSlot(dto);
  }
}

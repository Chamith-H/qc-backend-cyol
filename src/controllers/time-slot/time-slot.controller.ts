import { Controller, Post, Body } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { CreateTimeSlotDto, SelectedTimeSlotDto } from './time-slot.dto';

@Controller('time-slot')
export class TimeSlotController {
    constructor(private readonly timeSlotService: TimeSlotService){}

    @Post('create')
    async createSlot(@Body() dto: CreateTimeSlotDto) {
        return await this.timeSlotService.create_timeSlot(dto)
    }

    @Post('selected')
    async selectSlot(@Body() dto: SelectedTimeSlotDto) {
        return await this.timeSlotService.get_selectedSlot(dto)
    }
}

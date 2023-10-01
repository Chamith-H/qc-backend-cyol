import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeSlot, TimeSlotDocument } from 'src/schemas/common/timer.schema';
import { SelectedTimeSlotDto } from './time-slot.dto';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectModel(TimeSlot.name)
    private readonly timeSlotModel: Model<TimeSlotDocument>,
  ) {}

  async create_timeSlot() {
    const timer = {
      category: 'WGR',
      shift: 'Day',
      times: [
        {
          time: '18.00',
        },
        {
          time: '20.00',
        },
        {
          time: '22.00',
        },
        {
          time: '00.00',
        },
        {
          time: '16.00',
        },
      ],
    };

    const newSlot = new this.timeSlotModel(timer);
    return await newSlot.save();
  }

  async get_selectedSlot(dto: SelectedTimeSlotDto) {
    const slots = await this.timeSlotModel.findOne(dto);
    return slots;
  }
}

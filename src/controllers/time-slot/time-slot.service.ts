import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeSlot, TimeSlotDocument } from 'src/schemas/common/timer.schema';
import { CreateTimeSlotDto, SelectedTimeSlotDto } from './time-slot.dto';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectModel(TimeSlot.name)
    private readonly timeSlotModel: Model<TimeSlotDocument>,
  ) {}

  async create_timeSlot(dto: CreateTimeSlotDto) {
    const isExist = await this.timeSlotModel.findOne({
      category: dto.category,
      shift: dto.shift,
    });

    if (isExist !== null) {
      throw new ForbiddenException('This is already created');
    }

    const newSlot = new this.timeSlotModel(dto);
    return await newSlot.save();
  }

  async get_selectedSlot(dto: SelectedTimeSlotDto) {
    return await this.timeSlotModel.findOne(dto);
  }
}

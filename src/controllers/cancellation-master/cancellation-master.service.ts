import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Cancellation,
  CancellationDocument,
} from 'src/schemas/cancellation/cancellation-master.schema';
import {
  CreateCancellationDto,
  FilterCancellationDto,
} from './cancellation-master.dto';

@Injectable()
export class CancellationMasterService {
  constructor(
    @InjectModel(Cancellation.name)
    private readonly cancellationModel: Model<CancellationDocument>,
  ) {}

  async add_newCancellationMaster(dto: CreateCancellationDto) {
    const newCancellation = new this.cancellationModel(dto);
    return await newCancellation.save();
  }

  async get_allCancellations(dto: FilterCancellationDto) {
    return await this.cancellationModel.find(dto);
  }
}

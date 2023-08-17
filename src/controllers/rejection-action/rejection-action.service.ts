import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RejectionAction,
  RejectionActionDocument,
} from 'src/schemas/rejection/rejection-action.schema';
import {
  CreateRejectActionDto,
  UpdateRejectActionDto,
} from './rejection-action.dto';

@Injectable()
export class RejectionActionService {
  constructor(
    @InjectModel(RejectionAction.name)
    private readonly rejectActionModel: Model<RejectionActionDocument>,
  ) {}

  async create_rejectAction(dto: CreateRejectActionDto) {
    const newAction = new this.rejectActionModel(dto);
    const response = await newAction.save();
    return response._id;
  }

  async update_currentStatus(dto: UpdateRejectActionDto) {
    return await this.rejectActionModel.updateOne(
      { _id: dto.rejectId },
      { $set: { status: 'completed' } },
    );
  }
}

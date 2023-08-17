import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RejectList,
  RejectListDocument,
} from 'src/schemas/rejection/rejection-list.schema';
import { CreateRejectListDto, FilterRejectListDto } from './rejection-list.dto';

@Injectable()
export class RejectionListService {
  constructor(
    @InjectModel(RejectList.name)
    private readonly rejectListModel: Model<RejectListDocument>,
  ) {}

  async createNewTable(dto: CreateRejectListDto) {
    const newList = new this.rejectListModel(dto);
    return await newList.save();
  }

  async get_allRejectLists(dto: FilterRejectListDto) {
    return await this.rejectListModel.find(dto);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RejectList,
  RejectListDocument,
} from 'src/schemas/rejection/rejection-list.schema';
import { CreateRejectListDto, FilterRejectListDto } from './rejection-list.dto';
import { RequestGenerater } from 'src/configs/shared/request.generater';

@Injectable()
export class RejectionListService {
  constructor(
    @InjectModel(RejectList.name)
    private readonly rejectListModel: Model<RejectListDocument>,
    private readonly requestGenerater: RequestGenerater,
  ) {}

  async createNewTable(dto: CreateRejectListDto) {
    const requestData = await this.requestGenerater.create_NewRequest(
      this.rejectListModel,
      'RJL',
    );

    const newList = new this.rejectListModel({
      ...dto,
      number: requestData.requestNumber,
    });
    return await newList.save();
  }

  async get_allRejectLists(dto: FilterRejectListDto) {
    return await this.rejectListModel.find(dto).sort({ number: -1 });
  }
}

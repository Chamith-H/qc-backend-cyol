import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Rejection,
  RejectionDocument,
} from 'src/schemas/rejection/rejection-master.schema';
import {
  CreateRejectionMasterDto,
  FilterRejectionMasterDto,
} from './rejection-master.dto';

@Injectable()
export class RejectionMasterService {
  constructor(
    @InjectModel(Rejection.name)
    private readonly rejectionModel: Model<RejectionDocument>,
  ) {}

  async add_newRejectionMaster(dto: CreateRejectionMasterDto) {
    const newRejection = new this.rejectionModel(dto);
    return await newRejection.save();
  }

  async get_allRejectionMasters(dto: FilterRejectionMasterDto) {
    return await this.rejectionModel.find(dto);
  }
}

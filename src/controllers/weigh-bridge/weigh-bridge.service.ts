import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import {
  Weighbridge,
  WeighbridgeDocument,
} from 'src/schemas/origin/weigh-bridge.schema';
import {
  FilterWeighBridgeDto,
  UpdateWeightQuantityDto,
  WeighBridgeRequestDto,
} from './weigh-bridge.dto';

@Injectable()
export class WeighBridgeService {
  constructor(
    @InjectModel(Weighbridge.name)
    private readonly weighbridgeModel: Model<WeighbridgeDocument>,
    private readonly requestGenerater: RequestGenerater,
  ) {}

  async create_weighBridgeRequest(dto: WeighBridgeRequestDto) {
    const requestData = await this.requestGenerater.create_NewRequest(
      this.weighbridgeModel,
      'WB',
    );

    const weighBridgeData = {
      ...dto,
      number: requestData.requestNumber,
      requestNo: requestData.requestId,
      transaction: 'Pending',
      itemWeight: '',
    };

    const newWeighbridgeRequest = new this.weighbridgeModel(weighBridgeData);
    const response = await newWeighbridgeRequest.save();

    if (response === null) {
      throw new BadRequestException('Internal server error: Unknown error');
    }

    return {
      transferTo: 'Weigh-Bridge',
      newRequest: response.requestNo,
    };
  }

  async get_allWeighBridges(dto: FilterWeighBridgeDto) {
    if (dto.transaction === 'All') {
      delete dto.transaction;
    }

    return await this.weighbridgeModel.find(dto).sort({ number: -1 }).exec();
  }

  async update_Weight(dto: UpdateWeightQuantityDto) {
    return await this.weighbridgeModel.updateOne(
      { _id: dto.requestId },
      { $set: { itemWeight: dto.itemWeight } },
    );
  }

  async create_GRN(dto: UpdateWeightQuantityDto) {
    return await this.weighbridgeModel.updateOne({_id: dto.requestId}, {$set: {transaction: 'Completed'}})
  }
}

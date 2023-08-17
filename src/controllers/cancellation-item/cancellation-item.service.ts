import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CancellationItem,
  CancellationItemDocument,
} from 'src/schemas/cancellation/cancellation-item.schema';
import {
  CreateCancellationDto,
  FilterCancellationDto,
  TransferWeighbridgeDto,
} from './cancellation-item.dto';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { WeighBridgeService } from '../weigh-bridge/weigh-bridge.service';

@Injectable()
export class CancellationItemService {
  constructor(
    @InjectModel(CancellationItem.name)
    private readonly cancellationItemModel: Model<CancellationItemDocument>,
    private readonly requestGenerater: RequestGenerater,
    private readonly weighbridgeService: WeighBridgeService,
  ) {}

  async create_newCancellationitem(dto: CreateCancellationDto) {
    const requestData = await this.requestGenerater.create_NewRequest(
      this.cancellationItemModel,
      'CCL',
    );

    const cancellation = {
      number: requestData.requestNumber,
      cancellationNo: requestData.requestId,
      ...dto,
      transaction: 'Pending',
      transferedBy: '',
      transferDate: '',
    };

    const newCancelledItem = new this.cancellationItemModel(cancellation);
    const response = await newCancelledItem.save();

    return {
      transferTo: 'QC Cancellations',
      newRequest: response.cancellationNo,
    };
  }

  async get_allCancellationData(dto: FilterCancellationDto) {
    if (dto.transaction === 'All') {
      delete dto.transaction;
    }
    return await this.cancellationItemModel
      .find(dto)
      .sort({ number: -1 })
      .exec();
  }

  async transfer_weighBridge(dto: TransferWeighbridgeDto) {
    const currentData = await this.cancellationItemModel
      .findOne({ _id: dto.id })
      .populate({ path: 'docOrigin' })
      .exec();

    const weighBridge = {
      tokenNo: currentData.baseDocNo,
      po: currentData.docOrigin.refDocNo,
      itemCode: currentData.itemCode,
      line: currentData.docOrigin.line,
      batch: currentData.batchNo,
      date: dto.transferDate,
    };

    const newWeighBridge =
      await this.weighbridgeService.create_weighBridgeRequest(weighBridge);
    if (newWeighBridge) {
      const id = dto.id;
      delete dto.id;

      const updater = await this.cancellationItemModel.updateOne(
        { _id: id },
        { $set: dto },
      );

      if (updater.modifiedCount !== 1) {
        throw new BadRequestException('Internal server error: Unknown error');
      }

      return {
        message: `New weigh-bridge request generated successfuly (Request No: ${newWeighBridge.newRequest})`,
      };
    }
  }
}

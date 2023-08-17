import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RejectionItem,
  RejectionItemDocument,
} from 'src/schemas/rejection/rejection-item.schema';
import {
  CreateRejectionItemDto,
  ExistFinderDto,
  FilterRejectionItemDto,
} from './rejection-item.dto';
import { RejectionDataService } from '../rejection-data/rejection-data.service';
import { RequestGenerater } from 'src/configs/shared/request.generater';

@Injectable()
export class RejectionItemService {
  constructor(
    @InjectModel(RejectionItem.name)
    private readonly rejectionItemModel: Model<RejectionItemDocument>,
    private readonly rejectionDataService: RejectionDataService,
    private readonly requestGenerater: RequestGenerater,
  ) {}

  async create_rejectionRequest(dto: CreateRejectionItemDto) {
    const rejectData = {
      origin: dto.origin,
      rejectedDate: dto.rejectedDate,
      rejectCode: dto.rejectCode,
    };

    const single_RejectData =
      await this.rejectionDataService.create_rejectionData(rejectData);

    const existRejection = await this.rejectionItemModel.findOne({
      batch: dto.batch,
    });

    if (existRejection === null) {
      const requestData = await this.requestGenerater.create_NewRequest(
        this.rejectionItemModel,
        'REJ',
      );

      const rejectionRequest = {
        number: requestData.requestNumber,
        rejectionNo: requestData.requestId,
        stage: dto.stage,
        itemCode: dto.itemCode,
        batch: dto.batch,
        rejectionData: [single_RejectData],
      };

      const newRejectionRequest = new this.rejectionItemModel(rejectionRequest);
      const response = await newRejectionRequest.save();

      return {
        transferTo: 'Batch Rejections - Round 01',
        newRequest: response.rejectionNo,
      };
    } else {
      const id = existRejection._id;

      const rejectData = {
        origin: dto.origin,
        rejectedDate: dto.rejectedDate,
        rejectCode: dto.rejectCode,
      };

      const single_RejectData =
        await this.rejectionDataService.sameItem_secondRound(rejectData);

      const updateRejection = await this.rejectionItemModel.updateOne(
        { _id: id },
        { $push: { rejectionData: single_RejectData } },
      );

      return {
        transferTo: 'Batch Rejections - Round 02',
        newRequest: existRejection.rejectionNo,
      };
    }
  }

  async exist_FinderUpdate(dto: ExistFinderDto) {
    const existRejection = await this.rejectionItemModel.findOne({
      batch: dto.batch,
    });

    if (existRejection !== null) {
      const rejectData = {
        origin: dto.origin,
        rejectedDate: dto.date,
        rejectCode: '_',
      };

      const single_RejectData =
        await this.rejectionDataService.create_rejectionDataOther(rejectData);

      const updateRejection = await this.rejectionItemModel.updateOne(
        { _id: existRejection._id },
        { $push: { rejectionData: single_RejectData } },
      );

      return updateRejection;
    }
  }

  async get_allRejections(dto: FilterRejectionItemDto) {
    return await this.rejectionItemModel
      .find(dto)
      .sort({ number: -1 })
      .populate({
        path: 'rejectionData',
        populate: { path: 'rejectionSetting' },
      })
      .exec();
  }
}

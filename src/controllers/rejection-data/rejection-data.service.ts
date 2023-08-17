import {
  Inspection,
  InspectionDocument,
} from 'src/schemas/inspection/inspection.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RejectionData,
  RejectionDataDocument,
} from 'src/schemas/rejection/rejection-data.schema';
import {
  AcceptedItemDto,
  CreateRejectionDataDto,
  HandleRejectionDto,
} from './rejection-data.dto';
import { RejectionActionService } from '../rejection-action/rejection-action.service';
import { RejectionListService } from '../rejection-list/rejection-list.service';
import {
  RejectionItem,
  RejectionItemDocument,
} from 'src/schemas/rejection/rejection-item.schema';

@Injectable()
export class RejectionDataService {
  constructor(
    @InjectModel(RejectionData.name)
    private readonly rejectionDataModel: Model<RejectionDataDocument>,
    @InjectModel(Inspection.name)
    private readonly inspectionModel: Model<InspectionDocument>,
    @InjectModel(RejectionItem.name)
    private readonly rejectionItemModel: Model<RejectionItemDocument>,
    private readonly rejectActionService: RejectionActionService,
    private readonly rejectionListService: RejectionListService,
  ) {}

  async create_rejectionData(dto: CreateRejectionDataDto) {
    const newAction = {
      action: `Rejected 1st time using code: ${dto.rejectCode}`,
      from: 'QC inspection',
      date: dto.rejectedDate,
      type: 1,
      status: 'pending',
    };

    const createdAction = await this.rejectActionService.create_rejectAction(
      newAction,
    );

    const rejectData = {
      ...dto,
      round: '01',
      status: 'Pending',
      rejectionSetting: [createdAction],
    };
    const newRejectData = new this.rejectionDataModel(rejectData);
    const response = await newRejectData.save();

    return response._id;
  }

  async create_rejectionDataOther(dto: CreateRejectionDataDto) {
    const newAction = {
      action: '2nd inspection marked this item as non-reject',
      from: 'QC inspection',
      date: dto.rejectedDate,
      type: 6,
      status: 'pending',
    };

    const createdAction = await this.rejectActionService.create_rejectAction(
      newAction,
    );

    const rejectData = {
      ...dto,
      round: '02',
      status: 'Accepted',
      rejectionSetting: [createdAction],
    };
    const newRejectData = new this.rejectionDataModel(rejectData);
    const response = await newRejectData.save();

    return response._id;
  }

  async sameItem_secondRound(dto: CreateRejectionDataDto) {
    const newAction = {
      action: `Rejected 2nd time using code: ${dto.rejectCode}`,
      from: 'QC inspection',
      date: dto.rejectedDate,
      type: 1,
      status: 'pending',
    };

    const createdAction = await this.rejectActionService.create_rejectAction(
      newAction,
    );

    const rejectData = {
      ...dto,
      round: '02',
      status: 'Rejected',
      rejectionSetting: [createdAction],
    };
    const newRejectData = new this.rejectionDataModel(rejectData);
    const response = await newRejectData.save();

    return response._id;
  }

  async transfer_secondInspection(dto: HandleRejectionDto) {
    const newAction = {
      action: 'Requested approval to transfer this item to 2nd QC inspection',
      from: dto.from,
      date: dto.date,
      type: 2,
      status: 'pending',
    };

    const createdAction = await this.rejectActionService.create_rejectAction(
      newAction,
    );
    return await this.update_rejectionSetting(
      dto.originDoc,
      dto.currentDoc,
      createdAction,
      'Approval',
    );
  }

  async approve_secondTransfer(dto: HandleRejectionDto) {
    const newAction = {
      action: 'Accepted the approval and created new QC inspection request',
      from: dto.from,
      date: dto.date,
      type: 3,
      status: 'pending',
    };

    const createdAction = await this.rejectActionService.create_rejectAction(
      newAction,
    );
    return await this.update_rejectionSetting(
      dto.originDoc,
      dto.currentDoc,
      createdAction,
      'Transferred',
    );
  }

  async manually_rejectItems(dto: HandleRejectionDto) {
    const newAction = {
      action: 'Rejected manually and transfered to rejected list',
      from: dto.from,
      date: dto.date,
      type: 4,
      status: 'pending',
    };

    const createdAction = await this.rejectActionService.create_rejectAction(
      newAction,
    );

    const getFullOrigin = await this.create_newFullyRejecter(dto);
    if (getFullOrigin === null) {
      throw new BadRequestException('Internal server error');
    }

    return await this.update_rejectionSetting(
      dto.originDoc,
      dto.currentDoc,
      createdAction,
      'Fully rejected',
    );
  }

  async tranfer_toRejectedTable(dto: HandleRejectionDto) {
    const newAction = {
      action: 'Transfered to rejected list',
      from: dto.from,
      date: dto.date,
      type: 4,
      status: 'pending',
    };

    const createdAction = await this.rejectActionService.create_rejectAction(
      newAction,
    );

    const getFullOrigin = await this.create_newFullyRejecter(dto);
    if (getFullOrigin === null) {
      throw new BadRequestException('Internal server error');
    }

    return await this.update_rejectionSetting(
      dto.originDoc,
      dto.currentDoc,
      createdAction,
      'Fully rejected',
    );
  }

  async update_rejectionSetting(
    id: string,
    current: string,
    action: string,
    target: string,
  ) {
    const updateArray = await this.rejectionDataModel.updateOne(
      { _id: id },
      { $push: { rejectionSetting: action } },
    );

    if (updateArray.modifiedCount !== 1) {
      throw new BadRequestException('Internal server error: unknown error');
    }

    const update_Action = await this.rejectActionService.update_currentStatus({
      rejectId: current,
    });

    if (update_Action.modifiedCount !== 1) {
      throw new BadRequestException('Internal server error: unknown error');
    }

    const statusUpdater = await this.rejectionDataModel.updateOne(
      { _id: id },
      { $set: { status: target } },
    );

    if (statusUpdater.modifiedCount !== 1) {
      throw new BadRequestException('Internal server error: unknown error');
    }

    return statusUpdater;
  }

  async create_newFullyRejecter(dto: HandleRejectionDto) {
    const originRequest = await this.rejectionDataModel.findOne({
      _id: dto.originDoc,
    });

    const originInspection = await this.inspectionModel.findOne({
      requestId: originRequest.origin,
    });

    const rejectedItem = await this.rejectionItemModel.findOne({
      batch: originInspection.batch,
    });

    const rejectTable = {
      stage: originInspection.stage,
      baseDoc: originInspection.baseDoc,
      itemCode: originInspection.itemCode,
      batch: originInspection.batch,
      code: originInspection.code,
      round: originRequest.round,
      rejectNo: rejectedItem.rejectionNo,
      inspectNo: originInspection.requestId,
    };

    return await this.rejectionListService.createNewTable(rejectTable);
  }
}

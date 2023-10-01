import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateCreater } from 'src/configs/shared/date.creater';
import { ItemParameterService } from '../item-parameter/item-parameter.service';

import {
  ProdCommonShift,
  ProdCommonShiftDocument,
} from 'src/schemas/prod-common/prod-common-shift.schema';
import {
  ProdCommonItem,
  ProdCommonItemDocument,
} from 'src/schemas/prod-common/prod-common-item.schema';
import {
  ProdCommonTime,
  ProdCommonTimeDocument,
} from 'src/schemas/prod-common/prod-common-time.schema';
import {
  AddTimeDto,
  CommonCreateDto,
  CreateItemDto,
  FilterMainDto,
  GetIdDto,
  ProdInspectionDto,
} from './prod-common.dto';
import {
  ProdCommonMain,
  ProdCommonMainDocument,
} from 'src/schemas/prod-common/prod-common-main.schema';
import { CommonGenerater } from 'src/configs/shared/common.generater';

@Injectable()
export class ProdCommonService {
  constructor(
    @InjectModel(ProdCommonMain.name)
    private readonly prodCommonMainModel: Model<ProdCommonMainDocument>,

    @InjectModel(ProdCommonShift.name)
    private readonly prodCommonShiftModel: Model<ProdCommonShiftDocument>,

    @InjectModel(ProdCommonItem.name)
    private readonly prodCommonItemModel: Model<ProdCommonItemDocument>,

    @InjectModel(ProdCommonTime.name)
    private readonly prodCommonTimeModel: Model<ProdCommonTimeDocument>,
    private readonly requestGenerater: CommonGenerater,
    private readonly dateCreater: DateCreater,
    private readonly itemParameterService: ItemParameterService,
  ) {}

  async create_granulationTest(dto: CommonCreateDto) {
    const existRequest = await this.prodCommonMainModel.findOne({
      date: this.dateCreater.create_newDate(),
      category: dto.category,
    });

    if (existRequest) {
      const expandRequest = await this.prodCommonMainModel
        .findOne({
          date: this.dateCreater.create_newDate(),
          category: dto.category,
        })
        .populate({ path: 'shifts' });

      const shifts = expandRequest.shifts;

      const existShift = shifts.some(
        (shiftObj) => shiftObj.shift === dto.shift,
      );

      if (existShift) {
        throw new ConflictException(`${dto.shift} shift already created`);
      }

      const pendings = shifts.some((shiftObj) => shiftObj.status === 'Pending');

      if (pendings) {
        throw new ConflictException(
          'Please complete current shift before creating a new shift',
        );
      }

      const newShift = new this.prodCommonShiftModel({
        ...dto,
        status: 'Pending',
        origin: {
          request: existRequest.requestNo,
          date: existRequest.date,
          category: existRequest.category,
        },
      });
      const shift = await newShift.save();

      const secondShift = await this.prodCommonMainModel.updateOne(
        { _id: existRequest._id },
        {
          $push: { shifts: shift._id },
        },
      );

      if (secondShift.modifiedCount !== 1) {
        throw new Error('Error in new shift creation');
      }

      return { message: 'New shift created successfully' };
    }

    const requestData = await this.requestGenerater.create_NewRequest(
      this.prodCommonMainModel,
      dto.category,
      dto.category,
    );

    const request = {
      number: requestData.requestNumber,
      requestNo: requestData.requestId,
      category: dto.category,
      date: this.dateCreater.create_newDate(),
      checkedStatus: 'Pending',
      shifts: [],
    };

    const newRequest = new this.prodCommonMainModel(request);
    const response = await newRequest.save();

    if (response) {
      const newShift = new this.prodCommonShiftModel({
        ...dto,
        status: 'Pending',
        origin: {
          request: response.requestNo,
          date: response.date,
          category: response.category,
        },
      });
      const shift = await newShift.save();

      if (shift) {
        const updater = await this.prodCommonMainModel.updateOne(
          { _id: response._id },
          { $push: { shifts: shift._id } },
        );

        if (updater.modifiedCount !== 1) {
          throw new Error('Error in shift creation');
        }
      }

      return { message: 'New request generated successfully' };
    }
  }

  async get_allMains(dto: FilterMainDto) {
    if (dto.date) {
      dto.date = dto.date.slice(0, 10);
    }

    return await this.prodCommonMainModel
      .find(dto)
      .populate({ path: 'shifts' })
      .sort({ number: -1 });
  }

  async get_expandShift(dto: GetIdDto) {
    return await this.prodCommonShiftModel
      .findOne({ _id: dto.id })
      .populate({ path: 'items' });
  }

  async create_newItem(dto: CreateItemDto) {
    const exist = await this.prodCommonShiftModel
      .findOne({ _id: dto.id })
      .populate({ path: 'items' });

    const items = exist.items;
    const existItem = items.some(
      (itemObj) => itemObj.item === dto.item && itemObj.batch === dto.batch,
    );

    if (existItem) {
      throw new ConflictException('This item already been added');
    }

    const origin = {
      ...exist.origin,
      shift: exist.shift,
    };

    const newItem = {
      item: dto.item,
      batch: dto.batch,
      origin: origin,
      times: [],
      status: 'Pending',
    };

    const itemCreation = new this.prodCommonItemModel(newItem);
    const response = await itemCreation.save();

    const updater = await this.prodCommonShiftModel.updateOne(
      { _id: dto.id },
      { $push: { items: response._id } },
    );
    if (updater.modifiedCount !== 1) {
      throw new Error('Internal server error');
    }

    return { message: 'updated successfully' };
  }

  async get_selectedItem(dto: GetIdDto) {
    return await this.prodCommonItemModel
      .findOne({ _id: dto.id })
      .populate({ path: 'times' });
  }

  async create_inspectTime(dto: AddTimeDto) {
    const exist = await this.prodCommonItemModel
      .findOne({ _id: dto.id })
      .populate({ path: 'times' });

    const times = exist.times;

    const existTime = times.some((timeObj) => timeObj.origin.time === dto.time);

    if (existTime) {
      throw new ConflictException('This time already created');
    }

    const checkData = await this.itemParameterService.inspectionParameters({
      itemCode: exist.item,
      stage: dto.stage,
    });

    const newTime = {
      item: exist.item,
      batch: exist.batch,
      remarks: '',
      origin: { ...exist.origin, time: dto.time },
      qualityChecking: checkData,
      status: 'Pending',
      checkedBy: '',
      checkedDate: '',
    };

    const newItemDoc = new this.prodCommonTimeModel(newTime);
    const response = await newItemDoc.save();

    const updater = await this.prodCommonItemModel.updateOne(
      { _id: dto.id },
      { $push: { times: response._id } },
    );

    if (updater.modifiedCount !== 1) {
      throw new BadRequestException('Internal server error');
    }

    return { message: 'New inspection time created successfully' };
  }

  async get_selectedItemList(dto: GetIdDto) {
    const item = await this.prodCommonTimeModel
      .findOne({ _id: dto.id })
      .populate({
        path: 'qualityChecking',
        populate: {
          path: 'standardData',
          populate: {
            path: 'parameterId',
            populate: { path: 'uom equipment' },
          },
        },
      });

    return item;
  }

  async update_qcInspection(dto: ProdInspectionDto) {
    const id = dto.id;
    delete dto.id;

    const date = this.dateCreater.create_newDate();

    const updater = await this.prodCommonTimeModel.updateOne(
      { _id: id },
      { $set: { ...dto, checkedDate: date } },
    );
    if (updater.modifiedCount !== 1) {
      throw new ConflictException('Updating error');
    }

    return { message: 'QC status updated successfully' };
  }

  async complete_Shift(dto: GetIdDto) {
    const exist = await this.prodCommonItemModel
      .findOne({ _id: dto.id })
      .populate({ path: 'times' });

    const times = exist.times;

    const existTime = times.some((timeObj) => timeObj.status === 'Pending');

    if (existTime) {
      throw new ConflictException(
        'Cannot complete, because it has pending inspections',
      );
    }

    const updater = await this.prodCommonItemModel.updateOne(
      { _id: dto.id },
      { $set: { status: 'Completed' } },
    );
    if (updater.modifiedCount !== 1) {
      throw new BadRequestException('Cannot complete');
    }

    return { message: 'Inspection completed successfully' };
  }

  async close_currentShift(dto: GetIdDto) {
    const exist = await this.prodCommonShiftModel
      .findOne({ _id: dto.id })
      .populate({ path: 'items' });

    const items = exist.items;
    const existItem = items.some((itemObj) => itemObj.status === 'Pending');

    if (existItem) {
      throw new ConflictException(
        'Cannot complete this shift, because it has pending inspections',
      );
    }

    const updater = await this.prodCommonShiftModel.updateOne(
      { _id: dto.id },
      { $set: { status: 'Completed' } },
    );

    if (updater.modifiedCount !== 1) {
      throw new BadRequestException('Cannot complete this shift');
    }

    return { message: 'Shift completed successfully' };
  }

  async get_timeReport(dto: GetIdDto) {
    return await this.prodCommonTimeModel.findOne({ _id: dto.id }).populate({
      path: 'qualityChecking',
      populate: {
        path: 'standardData',
        populate: { path: 'parameterId', populate: { path: 'uom equipment' } },
      },
    });
  }

  async get_finalReport(dto: GetIdDto) {
    return await this.prodCommonShiftModel.findOne({ _id: dto.id }).populate({
      path: 'items',
      populate: {
        path: 'times',
        populate: {
          path: 'qualityChecking',
          populate: { path: 'standardData', populate: { path: 'parameterId' } },
        },
      },
    });
  }
}

import { DocOrigin } from './../../schemas/origin/doc-origin.schema';
import { RequestGenerater } from './../../configs/shared/request.generater';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WeightRecordItem,
  WeightRecordItemDocument,
} from 'src/schemas/weight-record/weight-record-item.schema';
import {
  WeightRecordMain,
  WeightRecordMainDocument,
} from 'src/schemas/weight-record/weight-record-main.schema';
import {
  WeightRecordShift,
  WeightRecordShiftDocument,
} from 'src/schemas/weight-record/weight-record-shift.schema';
import {
  WeightRecordTime,
  WeightRecordTimeDocument,
} from 'src/schemas/weight-record/weight-record-time.schema';
import {
  AddNewRecordDto,
  CreateTimeDto,
  FilterMainDto,
  GetShiftDto,
  TimeItemsDto,
  UpdateInspectionDto,
} from './weight-record.dto';
import { DateCreater } from 'src/configs/shared/date.creater';
import { ItemParameterService } from '../item-parameter/item-parameter.service';

@Injectable()
export class WeightRecordService {
  constructor(
    @InjectModel(WeightRecordMain.name)
    private readonly weightRecordMainModel: Model<WeightRecordMainDocument>,

    @InjectModel(WeightRecordItem.name)
    private readonly weightRecordItemModel: Model<WeightRecordItemDocument>,

    @InjectModel(WeightRecordTime.name)
    private readonly weightRecordTimeModel: Model<WeightRecordTimeDocument>,

    @InjectModel(WeightRecordShift.name)
    private readonly weightRecordShiftModel: Model<WeightRecordShiftDocument>,
    private readonly requestGenerater: RequestGenerater,
    private readonly dateCreater: DateCreater,
    private readonly itemParameterService: ItemParameterService,
  ) {}

  async create_newRecord(dto: AddNewRecordDto) {
    const existRequest = await this.weightRecordMainModel.findOne({
      date: this.dateCreater.create_newDate(),
    });

    if (existRequest) {
      const expandRequest = await this.weightRecordMainModel
        .findOne({
          date: this.dateCreater.create_newDate(),
        })
        .populate({ path: 'shifts' });

      const shifts = expandRequest.shifts;

      const existShift = shifts.some(
        (shiftObj) => shiftObj.shift === dto.shift,
      );

      if (existShift) {
        throw new ConflictException(`${dto.shift} shift already created`);
      }

      const newShift = new this.weightRecordShiftModel({
        ...dto,
        status: 'Pending',
        origin: {
          request: existRequest.requestNo,
          date: existRequest.date,
        },
      });
      const shift = await newShift.save();

      const secondShift = await this.weightRecordMainModel.updateOne(
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
      this.weightRecordMainModel,
      'WGR',
    );

    const request = {
      number: requestData.requestNumber,
      requestNo: requestData.requestId,
      date: this.dateCreater.create_newDate(),
      checkedStatus: 'Pending',
      shifts: [],
    };

    const newRequest = new this.weightRecordMainModel(request);
    const response = await newRequest.save();

    if (response) {
      const newShift = new this.weightRecordShiftModel({
        ...dto,
        status: 'Pending',
        origin: {
          request: response.requestNo,
          date: response.date,
        },
      });
      const shift = await newShift.save();

      if (shift) {
        const updater = await this.weightRecordMainModel.updateOne(
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
    return await this.weightRecordMainModel
      .find(dto)
      .populate({ path: 'shifts' });
  }

  async create_newTime(dto: CreateTimeDto) {
    const shift = await this.weightRecordShiftModel
      .findOne({ _id: dto.shiftId })
      .populate({ path: 'times' });

    const existTime = shift.times.some((timeObj) => timeObj.time === dto.time);

    if (existTime) {
      throw new ConflictException('This inspection time already created');
    }

    const timeSlot = {
      time: dto.time,
      origin: {
        ...shift.origin,
        shift: shift.shift,
      },
      status: 'Open',
    };

    const newTime = new this.weightRecordTimeModel(timeSlot);
    const response = await newTime.save();

    if (!response) {
      throw new BadRequestException('Internal server error!');
    }

    const updater = await this.weightRecordShiftModel.updateOne(
      { _id: dto.shiftId },
      { $push: { times: response._id } },
    );

    if (updater.modifiedCount !== 1) {
      throw new Error('Error in data creation');
    }

    return { message: 'New inspection time created successfully' };
  }

  async get_shiftData(dto: GetShiftDto) {
    const selectedShift = await this.weightRecordShiftModel
      .findOne({ _id: dto.id })
      .populate({ path: 'times', populate: { path: 'items' } });

    return selectedShift;
  }

  async update_inspectTime(dto: GetShiftDto) {
    const updater = await this.weightRecordTimeModel.updateOne(
      { _id: dto.id },
      { $set: { status: 'Closed' } },
    );

    if (updater.modifiedCount !== 1) {
      throw new Error('Error in updating');
    }

    return { message: 'Updated successfully' };
  }

  async add_timeItems(dto: TimeItemsDto) {
    const existTime = await this.weightRecordTimeModel
      .findOne({ _id: dto.id })
      .populate({ path: 'items' });

    const existItem = existTime.items.some(
      (itemObj) => itemObj.item === dto.item,
    );

    if (existItem) {
      throw new ConflictException(
        'This item has been already included in this inspection time',
      );
    }

    const checkData = await this.itemParameterService.inspectionParameters({
      itemCode: dto.item,
      stage: 'WGR',
    });

    const itemDoc = {
      item: dto.item,
      batch: '',
      remarks: '',
      origin: { ...existTime.origin, time: existTime.time },
      qualityChecking: checkData,
      status: 'Pending',
      checkedBy: '',
      checkedDate: '',
    };

    const newItemDoc = new this.weightRecordItemModel(itemDoc);
    const response = await newItemDoc.save();

    if (!response) {
      throw new Error('Internal server error');
    }

    const updater = await this.weightRecordTimeModel.updateOne(
      { _id: dto.id },
      { $push: { items: response._id } },
    );

    if (updater.modifiedCount !== 1) {
      throw new Error('Internal server error');
    }

    return { message: 'Item added succesfully' };
  }

  async get_selectedItem(dto: GetShiftDto) {
    const item = await this.weightRecordItemModel
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

  async update_qcInspection(dto: UpdateInspectionDto) {
    const id = dto.id;
    delete dto.id;

    const date = this.dateCreater.create_newDate();

    const updater = await this.weightRecordItemModel.updateOne(
      { _id: id },
      { $set: { ...dto, checkedDate: date } },
    );
    if (updater.modifiedCount !== 1) {
      throw new ConflictException('Updating error');
    }

    return { message: 'QC status updated successfully' };
  }
}

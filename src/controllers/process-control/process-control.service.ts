import {
  ProcessControlShift,
  ProcessControlShiftDocument,
} from './../../schemas/process-control/process-control-shift.schema';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProcessControlData,
  ProcessControlDataDocument,
} from 'src/schemas/process-control/process-control-data.schema';
import {
  ProcessControlMain,
  ProcessControlMainDocument,
} from 'src/schemas/process-control/process-control-main.schema';
import {
  ProcessControlTime,
  ProcessControlTimeDocument,
} from 'src/schemas/process-control/process-control-time.schema';
import { CreateProcessControlDto, SelectedProcessControlDto } from './process-control.dto';
import { BatchOriginService } from '../batch-origin/batch-origin.service';
import { RequestGenerater } from 'src/configs/shared/request.generater';

@Injectable()
export class ProcessControlService {
  constructor(
    @InjectModel(ProcessControlMain.name)
    private readonly processControlMainModel: Model<ProcessControlMainDocument>,

    @InjectModel(ProcessControlShift.name)
    private readonly processControlShiftModel: Model<ProcessControlShiftDocument>,

    @InjectModel(ProcessControlTime.name)
    private readonly processControlTimeModel: Model<ProcessControlTimeDocument>,

    @InjectModel(ProcessControlData.name)
    private readonly processControlDataModel: Model<ProcessControlDataDocument>,

    private readonly batchOriginService: BatchOriginService,
    private readonly requestGenerater: RequestGenerater,
  ) {}

  async create_processControlMain(dto: CreateProcessControlDto) {
    const existProcess = await this.processControlMainModel
      .findOne({
        itemCode: dto.itemCode,
        date: dto.date,
      })
      .populate({ path: 'shifts' });

    if (existProcess === null) {
      const requestData = await this.requestGenerater.create_NewRequest(
        this.processControlMainModel,
        'OPC',
      );

      const newBatch = await this.batchOriginService.save_newBatch();

      const shift = await this.create_newShift(requestData.requestId, dto.shift, dto.createdBy);

      const processControl = {
        number: requestData.requestNumber,
        requestCode: requestData.requestId,
        itemCode: dto.itemCode,
        itemName: dto.itemName,
        batch: newBatch,
        date: dto.date,
        shifts: [shift],
      };

      const newProcess = new this.processControlMainModel(processControl);
      const response = await newProcess.save();
      if (response) {
        return { message: 'New production inspection created successfully' };
      }
    } else {
      if (existProcess.shifts.length >= 2) {
        throw new BadRequestException('Only 2 shifts can be made');
      }

      if (existProcess.shifts[0].type === dto.shift) {
        throw new BadRequestException('This shift already created');
      }

      const newShift = await this.create_newShift(existProcess.requestCode, dto.shift, dto.createdBy);
      const response = await this.processControlMainModel.updateOne(
        { _id: existProcess._id },
        { $push: { shifts: newShift } },
      );
      if(response.modifiedCount !== 0) {
        return {message: 'Created new shift successfully'}
      }
    }
  }

  async create_newShift(base: string, shiftType: string, creater: string) {
    const shift = {
    origin: base,
      type: shiftType,
      times: [],
      createdBy: creater,
      status: 'Pending',
    };

    const newShift = new this.processControlShiftModel(shift);
    const response = await newShift.save();
    return response._id;
  }

  async get_allProcessControls() {
    return await this.processControlMainModel
      .find({})
      .populate({ path: 'shifts' })
      .sort({ number: -1 })
      .exec();
  }

  async get_selectedProcess(dto: SelectedProcessControlDto) {
    return await this.processControlMainModel.findOne(dto)
  }
}

import { RequestGenerater } from './../../configs/shared/request.generater';
import {
  PackingMain,
  PackingMainDocument,
} from './../../schemas/packing-section/packing-main.schema';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PackingMachine,
  PackingMachineDocument,
} from 'src/schemas/packing-section/packing-machine.schema';
import {
  CreateMachineDto,
  FilterPackingDto,
  PackingTimeDto,
  UpdateInitialDto,
  UpdatePendingDto,
} from './packing-section.dto';
import { DateCreater } from 'src/configs/shared/date.creater';
import {
  PackingTime,
  PackingTimeDocument,
} from 'src/schemas/packing-section/packing-times.schema';
import { SapIntegrationService } from '../sap-integration/sap-integration.service';

@Injectable()
export class PackingSectionService {
  constructor(
    private readonly dateCreater: DateCreater,
    private readonly requestGenerater: RequestGenerater,
    @InjectModel(PackingMachine.name)
    private readonly packingMachineModel: Model<PackingMachineDocument>,
    @InjectModel(PackingMain.name)
    private readonly packingMainModel: Model<PackingMainDocument>,
    @InjectModel(PackingTime.name)
    private readonly packingTimeModel: Model<PackingTimeDocument>,
    private readonly sapIntegrationService: SapIntegrationService,
  ) {}

  async add_newMachine(dto: CreateMachineDto) {
    const existCode = await this.packingMachineModel.findOne({
      code: dto.code,
    });
    if (existCode) {
      throw new ConflictException('This machine code is already exist');
    }

    const existName = await this.packingMachineModel.findOne({
      name: dto.name,
    });
    if (existName) {
      throw new ConflictException('This machine name is already exist');
    }

    const newMachine = new this.packingMachineModel(dto);
    return await newMachine.save();
  }

  async get_allMachines() {
    return await this.packingMachineModel.find({});
  }

  async create_newRequest() {
    const existDate = await this.packingMainModel.findOne({
      date: this.dateCreater.create_newDate(),
    });

    if (existDate) {
      throw new ConflictException('You already created new request to today');
    }

    const requestData = await this.requestGenerater.create_NewRequest(
      this.packingMainModel,
      'PSC',
    );

    const newRequest = {
      number: requestData.requestNumber,
      requestNo: requestData.requestId,
      date: this.dateCreater.create_newDate(),
      checkedStatus: 'Pending',
      machines: await this.get_allMachines(),
    };

    const newMain = new this.packingMainModel(newRequest);
    return await newMain.save();
  }

  async get_allRequests(dto: FilterPackingDto) {
    if (dto.date) {
      dto.date = dto.date.slice(0, 10);
    }
    return await this.packingMainModel.find(dto).sort({ number: -1 });
  }

  async create_newTime(dto: PackingTimeDto) {
    const exist = await this.packingTimeModel.findOne(dto);
    if (exist) {
      throw new ConflictException('This inspection time already created');
    }

    const currentList = await this.packingTimeModel.find({
      originReq: dto.originReq,
      machine: dto.machine,
    });

    const pendings = currentList.some(
      (timeObj) => timeObj.checked === 'Pending',
    );

    if (pendings) {
      throw new ConflictException('Please complete all inspections');
    }

    const inspection = {
      originReq: dto.originReq,
      machine: dto.machine,
      time: dto.time,
      item: '',
      batch: '',
      size: '',
      mfg: '',
      exp: '',
      bc: '',
      operator: '',
      supervisor: '',
      initial: 'Open',
      packWeight: 'Pending',
      sealingQuality: 'Pending',
      printQuality: 'Pending',
      iMark: 'Pending',
      metalDetect: 'Pending',
      checked: 'Pending',
    };

    const newInspection = new this.packingTimeModel(inspection);
    return await newInspection.save();
  }

  async get_allTimes(dto: PackingTimeDto) {
    delete dto.time;
    return await this.packingTimeModel.find(dto);
  }

  async update_initialData(id: string, dto: UpdateInitialDto) {
    const updater = await this.packingTimeModel.updateOne(
      { _id: id },
      { $set: { ...dto, initial: 'Closed' } },
    );

    if (updater.modifiedCount !== 1) {
      throw new BadRequestException('Cannot be updated');
    }

    return { message: 'Process completed, Machine ready to QC inspection' };
  }

  async update_pendingData(id: string, dto: UpdatePendingDto) {
    const updater = await this.packingTimeModel.updateOne(
      { _id: id },
      { $set: { ...dto, checked: 'Completed' } },
    );

    if (updater.modifiedCount !== 1) {
      throw new BadRequestException('Cannot be updated');
    }

    return { message: 'Inspection completed successfully' };
  }

  async complete_currentRequest(id: string) {
    const updater = await this.packingMainModel.updateOne(
      { _id: id },
      { checkedStatus: 'Completed' },
    );

    if (updater.modifiedCount !== 1) {
      throw new BadRequestException('Cannot complete this shift');
    }

    return { message: 'Request completed successfully' };
  }

  async delete_curentRequest(id: string) {
    const deleter = await this.packingMainModel.deleteOne({ _id: id });
    if (deleter.deletedCount !== 1) {
      throw new BadRequestException("Sorry, you can't delete this request");
    }

    return { message: 'Request deleted successfully' };
  }

  async remove_selectedMachine(id: string) {
    const deleter = await this.packingMachineModel.deleteOne({ _id: id });
    if (deleter.deletedCount !== 1) {
      throw new BadRequestException("Sorry, you can't remove this machine");
    }

    return { message: 'Machine removed successfully' };
  }

  async remove_inspectTime(id: string) {
    const deleter = await this.packingTimeModel.deleteOne({ _id: id });
    if (deleter.deletedCount !== 1) {
      throw new BadRequestException(
        "Sorry, you can't remove this inspection time",
      );
    }

    return { message: 'Inspection time removed successfully' };
  }

  async get_packingItems() {
    return await this.sapIntegrationService.getPackingItems();
  }
}

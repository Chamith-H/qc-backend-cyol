import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Equipment,
  EquipmentDocument,
} from '../../schemas/qc-parameter/equipment.schema';
import { Model } from 'mongoose';
import { CreateEquipmentDto } from './equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name)
    private readonly equipmentModel: Model<EquipmentDocument>,
  ) {}

  //--> Create new Equipment ---------------------------------------------------------------------<
  async add_newEquipment(dto: CreateEquipmentDto) {
    const existName = await this.equipmentModel.findOne({ name: dto.name });
    if (existName !== null) {
      throw new BadRequestException('This Equipment name is already exist');
    }

    const existCode = await this.equipmentModel.findOne({ code: dto.code });
    if (existCode !== null) {
      throw new BadRequestException('This Equipment code is already exist');
    }

    const newEquipment = new this.equipmentModel(dto);
    return await newEquipment.save();
  }

  //--> Get all equipments -----------------------------------------------------------------------<
  async get_allEquipments() {
    return await this.equipmentModel.find({});
  }
}

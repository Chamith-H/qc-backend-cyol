import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Uom, UomDocument } from '../../schemas/qc-parameter/uom.schema';
import { CreateUomDto } from './uom.dto';

@Injectable()
export class UomService {
  constructor(
    @InjectModel(Uom.name) private readonly uomModel: Model<UomDocument>,
  ) {}

  //--> create new Unit of messurement to the list -------------------------------------------<
  async add_newUom(dto: CreateUomDto) {
    const existName = await this.uomModel.findOne({ name: dto.name });
    if (existName !== null) {
      throw new BadRequestException('This UOM name is already exist');
    }

    const existSymbol = await this.uomModel.findOne({ symbol: dto.symbol });
    if (existSymbol !== null) {
      throw new BadRequestException('This UOM symbol is already exist');
    }

    const newUom = new this.uomModel(dto);
    return await newUom.save();
  }

  //--> Get all unit of messurements ----------------------------------------------------------<
  async get_allUoms() {
    return await this.uomModel.find({});
  }
}

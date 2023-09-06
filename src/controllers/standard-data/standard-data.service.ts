import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  StandardData,
  StandardDataDocument,
} from 'src/schemas/item-parameter/standard-data.schema';
import { CreateStandardDataDto } from './standard-data.dto';

@Injectable()
export class StandardDataService {
  constructor(
    @InjectModel(StandardData.name)
    private readonly standardDataModel: Model<StandardDataDocument>,
  ) {}

  async create_standardData(dto: CreateStandardDataDto) {
    let minValue = '';
    let maxValue = '';

    if (dto.minValue) {
      minValue = dto.minValue;
    } else {
      minValue = '_';
    }

    if (dto.maxValue) {
      maxValue = dto.maxValue;
    } else {
      maxValue = '_';
    }

    const standardData = {
      parameterId: dto.parameterId,
      minValue: minValue,
      maxValue: maxValue,
      stdValue: dto.stdValue,
      mandatory: dto.mandatory,
    };

    const newStandardData = new this.standardDataModel(standardData);
    return (await newStandardData.save())._id;
  }
}

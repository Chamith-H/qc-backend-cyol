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
    const newStandardData = new this.standardDataModel(dto);
    return (await newStandardData.save())._id;
  }
}

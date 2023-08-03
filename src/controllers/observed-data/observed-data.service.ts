import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ObservedData,
  ObservedDataDocument,
} from 'src/schemas/observed-data.schema';
import { CreateObservedDataDto } from './observed-data.dto';

@Injectable()
export class ObservedDataService {
  constructor(
    @InjectModel(ObservedData.name)
    private readonly observedDataModel: Model<ObservedDataDocument>,
  ) {}

  async initializeObservedData(dto: CreateObservedDataDto) {
    const initial = {
        standardData: dto.standardDataId,
        observedValue: '',
        checker: '',
        checkedDate: '',
        checkedStatus:'Pending'
    }

    const newInitialValue = new this.observedDataModel(initial)
    return (await newInitialValue.save())._id
  }
}

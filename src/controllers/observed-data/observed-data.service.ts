import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ObservedData,
  ObservedDataDocument,
} from 'src/schemas/inspection/observed-data.schema';
import {
  CreateObservedDataDto,
  UpdateObservedDataDto,
} from './observed-data.dto';

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
    };

    const newInitialValue = new this.observedDataModel(initial);
    return (await newInitialValue.save())._id;
  }

  async update_ObservedData(dto: UpdateObservedDataDto) {
    console.log(dto);
    const currentData = await this.observedDataModel.findOne({
      _id: dto.docId,
    });
    if (currentData.observedValue === dto.observedValue) {
      throw new ConflictException('Same value cannot be updated');
    }

    delete dto.docId;
    console.log(dto);

    return await this.observedDataModel.updateOne(
      { _id: currentData._id },
      { $set: dto },
    );
  }
}

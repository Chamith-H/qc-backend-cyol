import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stage, StageDocument } from 'src/schemas/item-parameter/stage.schema';
import { CreateStageDto, UpdateParameterDto } from './stage.dto';

@Injectable()
export class StageService {
  constructor(
    @InjectModel(Stage.name) private readonly stageModel: Model<StageDocument>,
  ) {}

  async CreateStage(dto: CreateStageDto) {
    const newStage = new this.stageModel(dto);
    return (await newStage.save())._id;
  }

  async UpdateParameters(dto: UpdateParameterDto) {
    return await this.stageModel.updateOne(
      { _id: dto.stageId },
      { $push: { parameterData: { $each: dto.parameterData } } },
    );
  }
}

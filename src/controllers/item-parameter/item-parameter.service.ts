import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ItemParameter,
  ItemParameterDocument,
} from 'src/schemas/item-parameter.schema';
import {
  CreateItemParameterDto,
  InspectionParameterDto,
  SelectedItemDto,
  UpdateStageDto,
} from './item-parameter.dto';
import { StandardDataService } from '../standard-data/standard-data.service';
import { StageService } from '../stage/stage.service';
import { ObservedDataService } from '../observed-data/observed-data.service';

@Injectable()
export class ItemParameterService {
  constructor(
    @InjectModel(ItemParameter.name)
    private readonly itemParameterModel: Model<ItemParameterDocument>,
    private readonly standardDataService: StandardDataService,
    private readonly stageService: StageService,
    private readonly observedDataService: ObservedDataService,
  ) {}

  //--> Assign QC parameter to selected Item & Selected-Stage -----------------------------<
  async add_newItemParameter(dto: CreateItemParameterDto) {
    const existItemParameter = await this.itemParameterModel.findOne({
      itemCode: dto.item,
    });
    if (existItemParameter === null) {
      const standardData = await Promise.all(
        dto.stage.parameterData.map(async (dataObject) => {
          return await this.standardDataService.create_standardData(dataObject);
        }),
      );

      const stageDto = {
        stageName: dto.stage.stageName,
        parameterData: standardData,
      };

      const stageId = await this.stageService.CreateStage(stageDto);

      const ItemParameterObject = {
        itemCode: dto.item,
        stages: [stageId],
      };

      const newItemParameter = new this.itemParameterModel(ItemParameterObject);
      return await newItemParameter.save();
    } else {
      const stages = (
        await this.itemParameterModel
          .findOne({ itemCode: dto.item })
          .populate({ path: 'stages' })
          .exec()
      ).stages;

      if (stages.some((stage) => stage.stageName === dto.stage.stageName)) {
        const currentStage = stages.find(
          (stage) => stage.stageName === dto.stage.stageName,
        );

        const standardData = await Promise.all(
          dto.stage.parameterData.map(async (dataObject) => {
            return await this.standardDataService.create_standardData(
              dataObject,
            );
          }),
        );

        const updateParameterDto = {
          stageId: currentStage._id,
          parameterData: standardData,
        };

        return await this.stageService.UpdateParameters(updateParameterDto);
      } else {
        const standardData = await Promise.all(
          dto.stage.parameterData.map(async (dataObject) => {
            return await this.standardDataService.create_standardData(
              dataObject,
            );
          }),
        );

        const stageDto = {
          stageName: dto.stage.stageName,
          parameterData: standardData,
        };

        const stageId = await this.stageService.CreateStage(stageDto);

        const ItemParameterObject = {
          itemCode: dto.item,
          stages: [stageId],
        };

        return await this.update_stagesArray(ItemParameterObject);
      }
    }
  }

  async update_stagesArray(dto: UpdateStageDto) {
    return await this.itemParameterModel.updateOne(
      { itemCode: dto.itemCode },
      { $push: { stages: { $each: dto.stages } } },
    );
  }

  async get_parameterId(itemCode: string) {
    return (await this.itemParameterModel.findOne({ item: itemCode }))._id;
  }

  async get_allItemParameters() {
    return await this.itemParameterModel
      .find({})
      .populate({
        path: 'stages',
        populate: {
          path: 'parameterData',
          populate: {
            path: 'parameter',
            populate: { path: 'uom equipment' },
          },
        },
      })
      .exec();
  }

  async inspectionParameters(dto: InspectionParameterDto) {
    const stages = (
      await this.itemParameterModel
        .findOne({ itemCode: dto.itemCode })
        .populate({ path: 'stages' })
        .exec()
    ).stages;

    const selected_stageParameters = stages.find(
      (stage) => stage.stageName === dto.stage,
    ).parameterData;

    return await Promise.all(
      selected_stageParameters.map(async (standardData) => {
        const observedDataDto = { standardDataId: standardData };
        return await this.observedDataService.initializeObservedData(
          observedDataDto,
        );
      }),
    );
  }
}

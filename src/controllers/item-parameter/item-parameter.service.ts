import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ItemParameter,
  ItemParameterDocument,
} from 'src/schemas/item-parameter/item-parameter.schema';
import {
  CreateItemParameterDto,
  FilterItemDto,
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

  async get_allCodes() {
    return await this.itemParameterModel.find({}).select('itemCode');
  }

  async get_allItemParameters(dto: FilterItemDto) {
    const itemParameters = await this.itemParameterModel
      .find(dto)
      .populate({
        path: 'stages',
      })
      .exec();

    let stageCount = 0;
    const dataSet = await Promise.all(
      itemParameters.map(async (itemParameter) => {
        let parameterCount = 0;
        stageCount = itemParameter.stages.length;
        await Promise.all(
          itemParameter.stages.map(async (stage) => {
            parameterCount = parameterCount + stage.parameterData.length;
          }),
        );

        return {
          itemCode: itemParameter.toObject().itemCode,
          stageCount: stageCount,
          parameterCount: parameterCount,
        };
      }),
    );

    return dataSet;
  }

  async get_selectedParameter(dto: FilterItemDto) {
    return await this.itemParameterModel.findOne(dto).populate({
      path: 'stages',
      populate: {
        path: 'parameterData',
        populate: { path: 'parameterId', populate: { path: 'uom' } },
      },
    });
  }

  async get_itemSelectedStage(dto: InspectionParameterDto) {
    const parameterData = await this.itemParameterModel
      .findOne({ itemCode: dto.itemCode })
      .populate({
        path: 'stages',
        populate: {
          path: 'parameterData',
          populate: { path: 'parameterId' },
        },
      })
      .exec();

    if (parameterData === null) {
      return [];
    }

    const selected_stageParameters = parameterData.stages.find(
      (stage) => stage.stageName === dto.stage,
    );

    if (
      selected_stageParameters === null ||
      selected_stageParameters === undefined
    ) {
      return [];
    }

    return selected_stageParameters.parameterData;
  }

  async parameter_toToken(itemCode: string) {
    try {
      const itemParameter = await this.itemParameterModel.find({
        itemCode: itemCode,
      });

      if (itemParameter === null) {
        throw new Error();
      }

      const all_stages = (
        await this.itemParameterModel
          .findOne({ itemCode: itemCode })
          .populate({ path: 'stages' })
          .exec()
      ).stages;

      if (all_stages.some((stage) => stage.stageName === 'Token')) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async inspectionParameters(dto: InspectionParameterDto) {
    const all_stages = (
      await this.itemParameterModel
        .findOne({ itemCode: dto.itemCode })
        .populate({ path: 'stages' })
        .exec()
    ).stages;

    const selected_stageParameters = all_stages.find(
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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inspection, InspectionDocument } from 'src/schemas/inspection.schema';
import { CreateInspectionDto } from './inspection.dto';
import { ItemParameterService } from '../item-parameter/item-parameter.service';
import { BatchOriginService } from '../batch-origin/batch-origin.service';

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(Inspection.name)
    private readonly inspectionModel: Model<InspectionDocument>,
    private readonly itemParameterService: ItemParameterService,
    private readonly batchOriginService: BatchOriginService
  ) {}

  async create_newInspection(dto: CreateInspectionDto) {
    const checkingData = await this.itemParameterService.inspectionParameters(
      dto,
    );

    const newBatchNumber = await this.batchOriginService.save_newBatch()
    console.log(newBatchNumber)

    const inspectionData = {
      number: 0,
      requestId: '',
      baseDocId: dto.baseDoc,
      stage: dto.stage,
      itemCode: dto.itemCode,
      batch: '',
      qualityChecking: checkingData,
      quantity: '_',
      warehouse: '_',
      qcStatus: 'Pending',
      transaction: 'Pending',
      inspectorCode: '',
      inspectorName: '',
      inspectionDate: '',
      description: '',
      remarks: '',
    };
  }
}

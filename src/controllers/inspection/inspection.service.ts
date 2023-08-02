import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inspection, InspectionDocument } from 'src/schemas/inspection.schema';
import { CreateInspectionDto } from './inspection.dto';
import { ItemParameterService } from '../item-parameter/item-parameter.service';

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel(Inspection.name)
    private readonly inspectionModel: Model<InspectionDocument>,
    private readonly itemParameterService: ItemParameterService,
  ) {}

  async create_newInspection(dto: CreateInspectionDto) {
    const checkingData = await this.itemParameterService.inspectionParameters(
      dto,
    );

    const inspectionData = {
      number: 0,
      requestId: '',
      baseDocId: '',
      stage:'',
      itemCode: '',
      batch: '',
      qualityChecking: '',
      quantity: '',
      warehouse: '_',
      qcStatus: 'Pending',
      transaction: 'Pending',
      inspectorCode: '',
      inspectorName: '',
      inspectionDate: '',
      description: '',
      remarks: ''
    }

    return checkingData;
  }
}

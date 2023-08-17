import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  QcParameter,
  QcParameterDocument,
} from '../../schemas/qc-parameter/qc-parameter.schema';
import { Model } from 'mongoose';
import { CreateQcParameterDto, FilterQcParameterDto } from './qc-parameter.dto';

@Injectable()
export class QcParameterService {
  constructor(
    @InjectModel(QcParameter.name)
    private readonly qcParameterModel: Model<QcParameterDocument>,
  ) {}

  //--> Add new QC parameter to the list ----------------------------------------------------<
  async add_newQcParameter(dto: CreateQcParameterDto) {
    const existName = await this.qcParameterModel.findOne({ name: dto.name });
    if (existName !== null) {
      throw new BadRequestException('This QC parameter name is already exist');
    }

    const existCode = await this.qcParameterModel.findOne({ code: dto.code });
    if (existCode !== null) {
      throw new BadRequestException('This QC parameter code is already exist');
    }

    const newQcParameter = new this.qcParameterModel(dto);
    return await newQcParameter.save();
  }

  //--> Get all QC parameters ---------------------------------------------------------------<
  async get_allQcParameters(dto: FilterQcParameterDto) {
    if (dto.type === 'all') {
      delete dto.type;
    }

    if (dto.value === 'all') {
      delete dto.value;
    }
    return await this.qcParameterModel
      .find(dto)
      .populate({ path: 'uom equipment' })
      .exec();
  }

  async get_allQcParametersToSelect() {
    return await this.qcParameterModel.find({});
  }

  //--> Get selected QC parameter -----------------------------------------------------------<
  async selected_qcParameter(id: string) {
    return await this.qcParameterModel
      .findOne({ _id: id })
      .populate({ path: 'uom equipment' })
      .exec();
  }
}

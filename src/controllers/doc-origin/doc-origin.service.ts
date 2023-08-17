import { Injectable } from '@nestjs/common';
import { CreateDocDto, CreatedRequestDto } from './doc-origin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DocOrigin,
  DocOriginDocument,
} from 'src/schemas/origin/doc-origin.schema';

@Injectable()
export class DocOriginService {
  constructor(
    @InjectModel(DocOrigin.name)
    private readonly docOriginModel: Model<DocOriginDocument>,
  ) {}

  async create_docOrigin(dto: CreateDocDto) {
    const newDoc = new this.docOriginModel(dto);
    return (await newDoc.save())._id;
  }

  async get_selectedOrigin(id: string) {
    const docOrigin = await this.docOriginModel.findOne({ _id: id });

    return {
      itemCode: docOrigin.itemCode,
      stage: docOrigin.baseDocType,
      baseDoc: docOrigin.baseDocNo,
    };
  }

  async get_subData(id: string) {
    const docOrigin = await this.docOriginModel.findOne({ _id: id });

    return {
      refDoc: docOrigin.refDocNo,
      line: docOrigin.line,
    };
  }

  async update_OriginTransaction(dto: CreatedRequestDto) {
    const id = dto.originId;
    delete dto.originId;
    return await this.docOriginModel.updateOne({ _id: id }, { $set: dto });
  }
}

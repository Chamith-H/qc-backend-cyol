import { Injectable } from '@nestjs/common';
import { CreateTokenDto, FilterTokenDto } from './token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from 'src/schemas/origin/token.schema';
import { Model } from 'mongoose';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { ItemParameterService } from '../item-parameter/item-parameter.service';
import { DocOriginService } from '../doc-origin/doc-origin.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    private readonly requestGenerater: RequestGenerater,
    private readonly itemParameterService: ItemParameterService,
    private readonly docOriginService: DocOriginService,
  ) {}

  async create_newToken(dto: CreateTokenDto) {
    const tokenData = await this.requestGenerater.create_NewRequest(
      this.tokenModel,
      'TKN',
    );

    const docOriginItems = await Promise.all(
      dto.items.map(async (item) => {
        const inspectData = {
          baseDocNo: tokenData.requestId,
          baseDocType: 'Token',
          refDocNo: dto.poNumber,
          refDocType: 'PO',
          itemCode: item.token,
          line: item.line,
          qcRequest: 'Pending',
          newRequest: '',
          transferor: '',
          transferDate: '',
        };

        return this.docOriginService.create_docOrigin(inspectData);
      }),
    );

    delete dto.items;

    const tokenInfo = {
      number: tokenData.requestNumber,
      tokenId: tokenData.requestId,
      ...dto,
      docItems: docOriginItems,
    };

    const newToken = new this.tokenModel(tokenInfo);
    return await newToken.save();
  }

  async get_allTokens(dto: FilterTokenDto) {
    return await this.tokenModel
      .find(dto)
      .populate({ path: 'docItems' })
      .sort({ number: -1 })
      .exec();
  }
}

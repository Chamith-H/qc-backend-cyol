import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from 'src/schemas/token.schema';
import { Model } from 'mongoose';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { ItemParameterService } from '../item-parameter/item-parameter.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    private readonly requestGenerater: RequestGenerater,
    private readonly itemParameterService: ItemParameterService,
  ) {}

  async create_newToken(dto: CreateTokenDto) {
    const tokenData = await this.requestGenerater.create_NewRequest(
      this.tokenModel,
      0,
      'T',
    );

    const selectedItems = await Promise.all(
      dto.items.map(async (item) => {
        return {
          itemCode: item.itemCode,
          parameterId: await this.itemParameterService.get_parameterId(
            item.itemCode,
          ),
          line: item.line,
        };
      }),
    );

    delete dto.items;

    const tokenInfo = {
      number: tokenData.requestNumber,
      tokenId: tokenData.requestId,
      ...dto,
      items: selectedItems,
    };

    const newToken = new this.tokenModel(tokenInfo);
    return await newToken.save();
  }
}

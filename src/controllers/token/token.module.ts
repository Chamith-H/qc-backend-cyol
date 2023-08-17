import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/schemas/origin/token.schema';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';
import { DocOriginModule } from '../doc-origin/doc-origin.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    ItemParameterModule,
    DocOriginModule,
  ],
  controllers: [TokenController],
  providers: [TokenService, RequestGenerater],
  exports: [TokenService],
})
export class TokenModule {}

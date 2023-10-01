import { Module } from '@nestjs/common';
import { ProdCommonController } from './prod-common.controller';
import { ProdCommonService } from './prod-common.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProdCommonShift,
  ProdCommonShiftSchema,
} from 'src/schemas/prod-common/prod-common-shift.schema';
import {
  ProdCommonItem,
  ProdCommonItemSchema,
} from 'src/schemas/prod-common/prod-common-item.schema';
import {
  ProdCommonTime,
  ProdCommonTimeSchema,
} from 'src/schemas/prod-common/prod-common-time.schema';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';
import { DateCreater } from 'src/configs/shared/date.creater';
import {
  ProdCommonMain,
  ProdCommonMainSchema,
} from 'src/schemas/prod-common/prod-common-main.schema';
import { CommonGenerater } from 'src/configs/shared/common.generater';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProdCommonMain.name, schema: ProdCommonMainSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProdCommonShift.name, schema: ProdCommonShiftSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProdCommonItem.name, schema: ProdCommonItemSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProdCommonTime.name, schema: ProdCommonTimeSchema },
    ]),
    ItemParameterModule,
  ],
  controllers: [ProdCommonController],
  providers: [ProdCommonService, DateCreater, CommonGenerater],
})
export class ProdCommonModule {}

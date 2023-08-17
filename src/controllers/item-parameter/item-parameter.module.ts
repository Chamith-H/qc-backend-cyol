import { Module } from '@nestjs/common';
import { ItemParameterController } from './item-parameter.controller';
import { ItemParameterService } from './item-parameter.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ItemParameter,
  ItemParameterSchema,
} from 'src/schemas/item-parameter/item-parameter.schema';
import { StandardDataModule } from '../standard-data/standard-data.module';
import { StageModule } from '../stage/stage.module';
import { ObservedDataModule } from '../observed-data/observed-data.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemParameter.name, schema: ItemParameterSchema },
    ]),
    StandardDataModule,
    StageModule,
    ObservedDataModule,
  ],
  controllers: [ItemParameterController],
  providers: [ItemParameterService],
  exports: [ItemParameterService],
})
export class ItemParameterModule {}

import { Module } from '@nestjs/common';
import { PackingSectionService } from './packing-section.service';
import { PackingSectionController } from './packing-section.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PackingMachine,
  PackingMachineSchema,
} from 'src/schemas/packing-section/packing-machine.schema';
import {
  PackingMain,
  PackingMainSchema,
} from 'src/schemas/packing-section/packing-main.schema';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { DateCreater } from 'src/configs/shared/date.creater';
import {
  PackingTime,
  PackingTimeSchema,
} from 'src/schemas/packing-section/packing-times.schema';
import { SapIntegrationModule } from '../sap-integration/sap-integration.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PackingMachine.name, schema: PackingMachineSchema },
    ]),
    MongooseModule.forFeature([
      { name: PackingMain.name, schema: PackingMainSchema },
    ]),
    MongooseModule.forFeature([
      { name: PackingTime.name, schema: PackingTimeSchema },
    ]),
    SapIntegrationModule,
  ],
  providers: [PackingSectionService, RequestGenerater, DateCreater],
  controllers: [PackingSectionController],
})
export class PackingSectionModule {}

import {
  ProcessControlShift,
  ProcessControlShiftSchema,
} from './../../schemas/process-control/process-control-shift.schema';
import { Module } from '@nestjs/common';
import { ProcessControlController } from './process-control.controller';
import { ProcessControlService } from './process-control.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProcessControlMain,
  ProcessControlMainSchema,
} from 'src/schemas/process-control/process-control-main.schema';
import {
  ProcessControlTime,
  ProcessControlTimeSchema,
} from 'src/schemas/process-control/process-control-time.schema';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { BatchOriginModule } from '../batch-origin/batch-origin.module';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProcessControlMain.name, schema: ProcessControlMainSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProcessControlShift.name, schema: ProcessControlShiftSchema },
    ]),
    MongooseModule.forFeature([
      { name: ProcessControlTime.name, schema: ProcessControlTimeSchema },
    ]),

    BatchOriginModule,
    ItemParameterModule,
  ],
  controllers: [ProcessControlController],
  providers: [ProcessControlService, RequestGenerater],
})
export class ProcessControlModule {}

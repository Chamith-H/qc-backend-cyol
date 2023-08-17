import { Module } from '@nestjs/common';
import { WeighBridgeController } from './weigh-bridge.controller';
import { WeighBridgeService } from './weigh-bridge.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Weighbridge,
  WeighbridgeSchema,
} from 'src/schemas/origin/weigh-bridge.schema';
import { RequestGenerater } from 'src/configs/shared/request.generater';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Weighbridge.name, schema: WeighbridgeSchema },
    ]),
  ],
  controllers: [WeighBridgeController],
  providers: [WeighBridgeService, RequestGenerater],
  exports: [WeighBridgeService],
})
export class WeighBridgeModule {}

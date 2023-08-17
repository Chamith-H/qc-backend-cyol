import { Module } from '@nestjs/common';
import { CancellationItemController } from './cancellation-item.controller';
import { CancellationItemService } from './cancellation-item.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CancellationItem,
  CancellationItemSchema,
} from 'src/schemas/cancellation/cancellation-item.schema';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { WeighBridgeModule } from '../weigh-bridge/weigh-bridge.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CancellationItem.name, schema: CancellationItemSchema },
    ]),
    WeighBridgeModule,
  ],
  controllers: [CancellationItemController],
  providers: [CancellationItemService, RequestGenerater],
  exports: [CancellationItemService],
})
export class CancellationItemModule {}

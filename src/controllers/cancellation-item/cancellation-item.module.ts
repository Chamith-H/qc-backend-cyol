import { Module } from '@nestjs/common';
import { CancellationItemController } from './cancellation-item.controller';
import { CancellationItemService } from './cancellation-item.service';

@Module({
  controllers: [CancellationItemController],
  providers: [CancellationItemService]
})
export class CancellationItemModule {}

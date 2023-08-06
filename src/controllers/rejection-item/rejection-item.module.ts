import { Module } from '@nestjs/common';
import { RejectionItemController } from './rejection-item.controller';
import { RejectionItemService } from './rejection-item.service';

@Module({
  controllers: [RejectionItemController],
  providers: [RejectionItemService],
  exports: [RejectionItemService],
})
export class RejectionItemModule {}

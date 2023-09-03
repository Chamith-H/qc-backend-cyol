import { Module } from '@nestjs/common';
import { WhsTransferController } from './whs-transfer.controller';
import { WhsTransferService } from './whs-transfer.service';

@Module({
  controllers: [WhsTransferController],
  providers: [WhsTransferService],
  exports: [WhsTransferService],
})
export class WhsTransferModule {}

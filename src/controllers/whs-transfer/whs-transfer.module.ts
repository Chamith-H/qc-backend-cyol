import { Module } from '@nestjs/common';
import { WhsTransferController } from './whs-transfer.controller';
import { WhsTransferService } from './whs-transfer.service';
import { RequestGenerater } from 'src/configs/shared/request.generater';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WhsTransfer,
  WhsTransferSchema,
} from 'src/schemas/inspection/whs-transfer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WhsTransfer.name, schema: WhsTransferSchema },
    ]),
  ],
  controllers: [WhsTransferController],
  providers: [WhsTransferService, RequestGenerater],
  exports: [WhsTransferService],
})
export class WhsTransferModule {}

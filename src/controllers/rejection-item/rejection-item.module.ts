import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RejectionItemController } from './rejection-item.controller';
import { RejectionItemService } from './rejection-item.service';
import {
  RejectionItem,
  RejectionItemSchema,
} from 'src/schemas/rejection/rejection-item.schema';
import { RejectionDataModule } from '../rejection-data/rejection-data.module';
import { RequestGenerater } from 'src/configs/shared/request.generater';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RejectionItem.name, schema: RejectionItemSchema },
    ]),
    RejectionDataModule,
  ],
  controllers: [RejectionItemController],
  providers: [RejectionItemService, RequestGenerater],
  exports: [RejectionItemService],
})
export class RejectionItemModule {}

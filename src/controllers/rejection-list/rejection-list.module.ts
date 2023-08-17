import { Module } from '@nestjs/common';
import { RejectionListController } from './rejection-list.controller';
import { RejectionListService } from './rejection-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RejectList,
  RejectListSchema,
} from 'src/schemas/rejection/rejection-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RejectList.name, schema: RejectListSchema },
    ]),
  ],
  controllers: [RejectionListController],
  providers: [RejectionListService],
  exports: [RejectionListService],
})
export class RejectionListModule {}

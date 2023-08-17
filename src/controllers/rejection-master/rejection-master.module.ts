import { Module } from '@nestjs/common';
import { RejectionMasterController } from './rejection-master.controller';
import { RejectionMasterService } from './rejection-master.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Rejection,
  RejectionSchema,
} from 'src/schemas/rejection/rejection-master.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rejection.name, schema: RejectionSchema },
    ]),
  ],
  controllers: [RejectionMasterController],
  providers: [RejectionMasterService],
})
export class RejectionMasterModule {}

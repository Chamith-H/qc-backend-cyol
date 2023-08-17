import { Module } from '@nestjs/common';
import { RejectionActionService } from './rejection-action.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RejectionAction,
  RejectionActionSchema,
} from 'src/schemas/rejection/rejection-action.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RejectionAction.name, schema: RejectionActionSchema },
    ]),
  ],
  providers: [RejectionActionService],
  exports: [RejectionActionService],
})
export class RejectionActionModule {}

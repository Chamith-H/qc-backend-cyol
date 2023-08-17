import { Module } from '@nestjs/common';
import { BatchOriginService } from './batch-origin.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BatchOrigin,
  BatchOriginSchema,
} from 'src/schemas/origin/batch-origin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BatchOrigin.name, schema: BatchOriginSchema },
    ]),
  ],
  providers: [BatchOriginService],
  exports: [BatchOriginService],
})
export class BatchOriginModule {}

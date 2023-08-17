import { Module } from '@nestjs/common';
import { CancellationMasterController } from './cancellation-master.controller';
import { CancellationMasterService } from './cancellation-master.service';
import {
  Cancellation,
  CancellationSchema,
} from 'src/schemas/cancellation/cancellation-master.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cancellation.name, schema: CancellationSchema },
    ]),
  ],
  controllers: [CancellationMasterController],
  providers: [CancellationMasterService],
})
export class CancellationMasterModule {}

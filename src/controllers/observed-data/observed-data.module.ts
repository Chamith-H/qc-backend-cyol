import { Module } from '@nestjs/common';
import { ObservedDataService } from './observed-data.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ObservedData,
  ObservedDataSchema,
} from 'src/schemas/inspection/observed-data.schema';
import { ObservedDataController } from './observed-data.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ObservedData.name, schema: ObservedDataSchema },
    ]),
  ],
  providers: [ObservedDataService],
  exports: [ObservedDataService],
  controllers: [ObservedDataController],
})
export class ObservedDataModule {}

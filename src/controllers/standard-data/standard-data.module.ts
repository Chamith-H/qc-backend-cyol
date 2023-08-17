import { Module } from '@nestjs/common';
import { StandardDataService } from './standard-data.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StandardData,
  StandardDataSchema,
} from 'src/schemas/item-parameter/standard-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StandardData.name, schema: StandardDataSchema },
    ]),
  ],
  providers: [StandardDataService],
  exports: [StandardDataService],
})
export class StandardDataModule {}

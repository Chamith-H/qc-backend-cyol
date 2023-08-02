import { Module } from '@nestjs/common';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inspection, InspectionSchema } from 'src/schemas/inspection.schema';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';
import { BatchOriginModule } from '../batch-origin/batch-origin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inspection.name, schema: InspectionSchema },
    ]),
    ItemParameterModule,
    BatchOriginModule,
  ],
  controllers: [InspectionController],
  providers: [InspectionService],
})
export class InspectionModule {}

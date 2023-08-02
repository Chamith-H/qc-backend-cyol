import { Module } from '@nestjs/common';
import { InspectionController } from './inspection.controller';
import { InspectionService } from './inspection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inspection, InspectionSchema } from 'src/schemas/inspection.schema';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inspection.name, schema: InspectionSchema },
    ]),
    ItemParameterModule
  ],
  controllers: [InspectionController],
  providers: [InspectionService],
})
export class InspectionModule {}

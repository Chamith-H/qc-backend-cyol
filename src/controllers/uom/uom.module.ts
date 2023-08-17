import { Module } from '@nestjs/common';
import { UomController } from './uom.controller';
import { UomService } from './uom.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Uom, UomSchema } from '../../schemas/qc-parameter/uom.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Uom.name, schema: UomSchema }])],
  controllers: [UomController],
  providers: [UomService],
})
export class UomModule {}

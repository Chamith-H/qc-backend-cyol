import { Module } from '@nestjs/common';
import { QcParameterController } from './qc-parameter.controller';
import { QcParameterService } from './qc-parameter.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QcParameter,
  QcParameterSchema,
} from '../../schemas/qc-parameter/qc-parameter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QcParameter.name, schema: QcParameterSchema },
    ]),
  ],
  controllers: [QcParameterController],
  providers: [QcParameterService],
  exports: [QcParameterService],
})
export class QcParameterModule {}

import { Module } from '@nestjs/common';
import { DocOriginService } from './doc-origin.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocOrigin,
  DocOriginSchema,
} from 'src/schemas/origin/doc-origin.schema';
import { DocOriginController } from './doc-origin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocOrigin.name, schema: DocOriginSchema },
    ]),
  ],
  providers: [DocOriginService],
  exports: [DocOriginService],
  controllers: [DocOriginController],
})
export class DocOriginModule {}

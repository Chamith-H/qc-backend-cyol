import { Module } from '@nestjs/common';
import { DocOriginService } from './doc-origin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DocOrigin, DocOriginSchema } from 'src/schemas/doc-origin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocOrigin.name, schema: DocOriginSchema },
    ]),
  ],
  providers: [DocOriginService],
  exports: [DocOriginService],
})
export class DocOriginModule {}

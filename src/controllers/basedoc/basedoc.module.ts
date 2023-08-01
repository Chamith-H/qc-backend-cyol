import { Module } from '@nestjs/common';
import { BasedocService } from './basedoc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseDoc, BaseDocSchema } from 'src/schemas/basedoc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BaseDoc.name, schema: BaseDocSchema }]),
  ],
  providers: [BasedocService],
  exports: [BasedocService],
})
export class BasedocModule {}

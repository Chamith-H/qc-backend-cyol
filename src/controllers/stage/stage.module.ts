import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Stage, StageSchema } from 'src/schemas/item-parameter/stage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stage.name, schema: StageSchema }]),
  ],
  providers: [StageService],
  exports: [StageService],
})
export class StageModule {}

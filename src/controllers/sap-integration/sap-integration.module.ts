import { Module } from '@nestjs/common';
import { SapIntegrationController } from './sap-integration.controller';
import { SapIntegrationService } from './sap-integration.service';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SapSession,
  SapSessionSchema,
} from 'src/schemas/sap-hooks/sap-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SapSession.name, schema: SapSessionSchema },
    ]),
    ItemParameterModule,
  ],
  controllers: [SapIntegrationController],
  providers: [SapIntegrationService],
  exports: [SapIntegrationService],
})
export class SapIntegrationModule {}

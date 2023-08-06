import { Module } from '@nestjs/common';
import { SapIntegrationController } from './sap-integration.controller';
import { SapIntegrationService } from './sap-integration.service';
import { ItemParameterModule } from '../item-parameter/item-parameter.module';

@Module({
  imports: [ItemParameterModule],
  controllers: [SapIntegrationController],
  providers: [SapIntegrationService]
})
export class SapIntegrationModule {}

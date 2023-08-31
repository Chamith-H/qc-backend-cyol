import { Module } from '@nestjs/common';
import { SapHookController } from './sap-hook.controller';
import { SapHookService } from './sap-hook.service';
import { SapIntegrationModule } from '../sap-integration/sap-integration.module';

@Module({
  imports: [SapIntegrationModule],
  controllers: [SapHookController],
  providers: [SapHookService],
})
export class SapHookModule {}

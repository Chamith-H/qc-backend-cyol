import { Module } from '@nestjs/common';
import { SapHookController } from './sap-hook.controller';
import { SapHookService } from './sap-hook.service';

@Module({
  controllers: [SapHookController],
  providers: [SapHookService]
})
export class SapHookModule {}

import { Injectable, Logger } from '@nestjs/common';
import { SapIntegrationService } from '../sap-integration/sap-integration.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SapHookService {
  private readonly logger = new Logger(SapHookService.name);
  constructor(private readonly sapIntegrationService: SapIntegrationService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    return this.sapIntegrationService.create_sapSession();
  }

  async trigger_GRNs() {
    const latest_grnData = await this.sapIntegrationService.get_latestGRN();
    console.log(latest_grnData);
  }
}

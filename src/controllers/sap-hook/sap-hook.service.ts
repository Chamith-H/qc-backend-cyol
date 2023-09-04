import { Injectable, Logger } from '@nestjs/common';
import { SapIntegrationService } from '../sap-integration/sap-integration.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SapGrn, SapGrnDocument } from 'src/schemas/sap-hooks/sap-grn.schema';
import { SapIvr, SapIvrDocument } from 'src/schemas/sap-hooks/sap-ivr.schema';
import { InspectionService } from '../inspection/inspection.service';

@Injectable()
export class SapHookService {
  private readonly logger = new Logger(SapHookService.name);
  constructor(
    @InjectModel(SapGrn.name)
    private readonly grnModel: Model<SapGrnDocument>,

    @InjectModel(SapIvr.name)
    private readonly ivrModel: Model<SapIvrDocument>,

    private readonly sapIntegrationService: SapIntegrationService,
    private readonly inspectionService: InspectionService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    return this.sapIntegrationService.create_sapSession();
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async trigger_GRNs() {
    const latest_grnData = await this.sapIntegrationService.get_latestGRN();

    latest_grnData.forEach(async (grn) => {
      const existGRN = await this.grnModel.findOne({ grnNo: grn.DocNum });
      if (!existGRN) {
        const inspection = {
          stage: 'GRN',
          itemCode: grn.DocumentLines[0].ItemCode,
          baseDoc: grn.DocNum,
          batch: grn.DocumentLines[0].SerialNum, // '', null, undefined
          warehouse: grn.DocumentLines[0].WarehouseCode,
          quantity: grn.DocumentLines[0].Quantity,
        };

        const createInspection =
          await this.inspectionService.create_newOtherInspection(inspection);

        if (createInspection) {
          const grnDocument = { grnNo: grn.DocNum };
          const newTrigger = new this.grnModel(grnDocument);
          await newTrigger.save();
        }
      }
    });
  }
}

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
    console.log('Validating sap session');
    return this.sapIntegrationService.create_sapSession();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async trigger_GRNs() {
    // console.log('Trigger GRNs');
    const latest_grnData = await this.sapIntegrationService.get_latestGRN();

    latest_grnData.forEach(async (grn) => {
      const existGRN = await this.grnModel.findOne({ grnNo: grn.DocNum });
      if (!existGRN) {
        const qcStatus = await this.sapIntegrationService.selected_wareHouse(
          grn.DocumentLines[0].WarehouseCode,
        );

        if (qcStatus.U_QC_Required === 'Y') {
          const inspection = {
            stage: 'GRN',
            itemCode: grn.DocumentLines[0].ItemCode,
            baseDoc: grn.DocNum,
            batch: grn.DocumentLines[0].SerialNum,
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
      }
    });
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async trigger_IVRs() {
    // console.log('Trigger IVRs');

    const latest_ivrData = await this.sapIntegrationService.get_latestIVR();

    latest_ivrData.forEach(async (ivr) => {
      const existIVR = await this.ivrModel.findOne({ ivrNo: ivr.DocNum });

      if (!existIVR) {
        const qcStatus = await this.sapIntegrationService.selected_wareHouse(
          ivr.StockTransferLines[0].WarehouseCode,
        );

        if (qcStatus.U_QC_Required === 'Y') {
          const inspection = {
            stage: 'IVR',
            itemCode: ivr.StockTransferLines[0].ItemCode,
            baseDoc: ivr.DocNum,
            batch: ivr.StockTransferLines[0].SerialNumber,
            warehouse: ivr.StockTransferLines[0].WarehouseCode,
            quantity: ivr.StockTransferLines[0].Quantity,
          };

          const createInspection =
            await this.inspectionService.create_newOtherInspection(inspection);

          if (createInspection) {
            const ivrDocument = { ivrNo: ivr.DocNum };
            const newTrigger = new this.ivrModel(ivrDocument);
            await newTrigger.save();
          }
        }
      }
    });
  }
}

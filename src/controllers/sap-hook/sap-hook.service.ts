import { Injectable, Logger } from '@nestjs/common';
import { SapIntegrationService } from '../sap-integration/sap-integration.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SapGrn, SapGrnDocument } from 'src/schemas/sap-hooks/sap-grn.schema';
import { SapIvr, SapIvrDocument } from 'src/schemas/sap-hooks/sap-ivr.schema';
import { InspectionService } from '../inspection/inspection.service';
import { delay } from 'rxjs';
import {
  SapReturn,
  SapReturnDocument,
} from 'src/schemas/sap-hooks/sap-return.schema';

@Injectable()
export class SapHookService {
  private readonly logger = new Logger(SapHookService.name);
  constructor(
    @InjectModel(SapGrn.name)
    private readonly grnModel: Model<SapGrnDocument>,

    @InjectModel(SapIvr.name)
    private readonly ivrModel: Model<SapIvrDocument>,

    @InjectModel(SapReturn.name)
    private readonly rtnModel: Model<SapReturnDocument>,

    private readonly sapIntegrationService: SapIntegrationService,
    private readonly inspectionService: InspectionService,
  ) {}

  async delayed(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Manage SAP session ...................................................................................
  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    return this.sapIntegrationService.create_sapSession();
  }

  // Trigger latest GRN s..................................................................................
  @Cron(CronExpression.EVERY_5_MINUTES)
  async trigger_GRNs() {
    const latest_grnData = await this.sapIntegrationService.get_latestGRN();

    for (const grn of latest_grnData) {
      const existGRN = await this.grnModel.findOne({ grnNo: grn.DocNum });
      if (!existGRN) {
        for (const item of grn.DocumentLines) {
          const qcStatus = await this.sapIntegrationService.selected_wareHouse(
            item.WarehouseCode,
          );

          if (qcStatus.U_QC_Required === 'Y') {
            const inspection = {
              stage: 'GRN',
              itemCode: item.ItemCode,
              baseDoc: grn.DocNum,
              batch: null,
              warehouse: item.WarehouseCode,
              quantity: item.Quantity,
            };

            const createInspection =
              await this.inspectionService.create_newOtherInspection(
                inspection,
              );

            if (createInspection) {
              // in a loop
              for (let i = 1; i > 0; i++) {
                if (createInspection) {
                  setTimeout(() => {}, 15000);
                  break;
                }
              }
            }
          }
        }
        const grnDocument = { grnNo: grn.DocNum };
        const newTrigger = new this.grnModel(grnDocument);
        const response = await newTrigger.save();

        for (let i = 1; i > 0; i++) {
          if (response) {
            setTimeout(() => {}, 15000);
            break;
          }
        }
      }
    }
  }

  // Trigger latest IVR s..................................................................................
  @Cron(CronExpression.EVERY_5_MINUTES)
  async trigger_IVRs() {
    const latest_ivrData = await this.sapIntegrationService.get_latestIVR();

    for (const ivr of latest_ivrData) {
      const existIVR = await this.ivrModel.findOne({ ivrNo: ivr.DocNum });

      if (!existIVR) {
        for (const item of ivr.StockTransferLines) {
          const qcStatus = await this.sapIntegrationService.selected_wareHouse(
            item.WarehouseCode,
          );

          if (qcStatus.U_QC_Required === 'Y') {
            const inspection = {
              stage: 'IVR',
              itemCode: item.ItemCode,
              baseDoc: ivr.DocNum,
              batch: null,
              warehouse: item.WarehouseCode,
              quantity: item.Quantity,
            };

            const createInspection =
              await this.inspectionService.create_newOtherInspection(
                inspection,
              );

            if (createInspection) {
              for (let i = 1; i > 0; i++) {
                if (createInspection) {
                  setTimeout(() => {}, 15000);
                  break;
                }
              }
            }
          }
        }
      }

      const ivrDocument = { ivrNo: ivr.DocNum };
      const newTrigger = new this.ivrModel(ivrDocument);
      const response = await newTrigger.save();

      for (let i = 1; i > 0; i++) {
        if (response) {
          setTimeout(() => {}, 15000);
          break;
        }
      }
    }
  }

  // Triget latest sales returns...........................................................................
  @Cron(CronExpression.EVERY_5_MINUTES)
  async trigger_Returns() {
    const latest_returnData =
      await this.sapIntegrationService.get_latestReturns();

    for (const rtn of latest_returnData) {
      const existRTN = await this.rtnModel.findOne({ rtnNo: rtn.DocNum });

      if (!existRTN) {
        for (const item of rtn.DocumentLines) {
          const qcStatus = await this.sapIntegrationService.selected_wareHouse(
            item.WarehouseCode,
          );

          if (qcStatus.U_QC_Required === 'Y') {
            const inspection = {
              stage: 'Return',
              itemCode: item.ItemCode,
              baseDoc: rtn.DocNum,
              batch: null,
              warehouse: item.WarehouseCode,
              quantity: item.Quantity,
            };

            const createInspection =
              await this.inspectionService.create_newOtherInspection(
                inspection,
              );

            if (createInspection) {
              // in a loop
              for (let i = 1; i > 0; i++) {
                if (createInspection) {
                  setTimeout(() => {}, 15000);
                  break;
                }
              }
            }
          }
        }
        const rtnDocument = { grnNo: rtn.DocNum };
        const newTrigger = new this.grnModel(rtnDocument);
        const response = await newTrigger.save();

        for (let i = 1; i > 0; i++) {
          if (response) {
            setTimeout(() => {}, 15000);
            break;
          }
        }
      }
    }
  }
}

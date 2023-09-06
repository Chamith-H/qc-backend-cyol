import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { ItemParameterService } from '../item-parameter/item-parameter.service';
import { checkServerIdentity } from 'tls';
import { InjectModel } from '@nestjs/mongoose';
import {
  SapSession,
  SapSessionDocument,
} from 'src/schemas/sap-hooks/sap-session.schema';
import { Model } from 'mongoose';
import { CreateIVRDto } from './sap-integration.dto';

@Injectable()
export class SapIntegrationService {
  constructor(
    @InjectModel(SapSession.name)
    private readonly sessionModel: Model<SapSessionDocument>,
    private readonly itemParameterService: ItemParameterService,
  ) {}

  private sapBase = 'https://160.242.56.198:50000/b1s/v2';

  async login_sapServer() {
    const hanaCredentials = {
      CompanyDB: 'UAT260B',
      UserName: 'manager',
      Password: 'Test@1234',
    };

    const path = '/Login';

    try {
      const session = await axios.post(this.sapBase + path, hanaCredentials, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      return {
        statusCode: 200,
        session: session.data.SessionId,
      };
    } catch (error) {
      throw error;
    }
  }

  async create_sapSession() {
    const currentSession = await this.sessionModel.findOne({ target: 'SAP' });
    const currentDate = new Date(currentSession.date);
    const nowDate = new Date();

    const timeGap = nowDate.getTime() - currentDate.getTime();
    const difference = timeGap / (1000 * 60);

    if (difference > 26) {
      const sapConnection = await this.login_sapServer();

      const sessionData = {
        sessionToken: sapConnection.session,
        date: new Date(),
      };

      const updateSession = await this.sessionModel.updateOne(
        { target: 'SAP' },
        { $set: sessionData },
      );

      return updateSession;
    }
  }

  async get_sapToken() {
    const sap_connection = await this.sessionModel.findOne({ target: 'SAP' });
    return sap_connection.sessionToken;
  }

  async get_qcItems() {
    const token = await this.get_sapToken();
    const path = '/Items';
    const logic =
      "?$select=ItemCode,ItemName,U_QC_Required&$filter=U_QC_Required eq 'Y'";

    try {
      const getQCItems = await axios.get(this.sapBase + path + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });
      return getQCItems.data.value;
    } catch (error) {
      throw error;
    }
  }

  async check_purchaseOrder(poNumber: string) {
    const token = await this.get_sapToken();
    const path = '/PurchaseOrders';
    const logic = `?$filter=DocNum eq ${poNumber}`;

    try {
      const checkedPo = await axios.get(this.sapBase + path + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      const data = {
        docEntry: checkedPo.data.value[0].DocEntry,
        supplier: checkedPo.data.value[0].CardName,
      };

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async selected_purchaseOrder(poNumber: string) {
    const token = await this.get_sapToken();
    const path = '/PurchaseOrders';
    const logic = `?$filter=DocNum eq ${poNumber}`;

    try {
      const selectedPo = await axios.get(this.sapBase + path + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      const itemData_set = await Promise.all(
        selectedPo.data.value[0].DocumentLines.map(async (item) => {
          const checkingDto = {
            itemCode: item.ItemCode,
            line: item.LineNum,
            stage: 'Token',
          };

          const getList = await this.itemParameterService.get_itemSelectedStage(
            checkingDto,
          );
          if (getList.length === 0) {
            return null;
          } else {
            return {
              ItemCode: item.ItemCode,
              LineNum: item.LineNum,
            };
          }
        }),
      );

      const finalArray = itemData_set.filter((item) => item !== null);
      if (finalArray.length === 0) {
        throw new BadRequestException('This PO number has no QC-items');
      }

      return finalArray;
    } catch (error) {
      throw error;
    }
  }

  async get_grnWarehouses() {
    const token = await this.get_sapToken();
    const path = '/Warehouses';
    const logic =
      "?$select=WarehouseCode,WarehouseName,U_QC_Required&$filter=U_GRN_Status eq 'Y'";

    try {
      const warehouses = await axios.get(this.sapBase + path + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      return warehouses.data.value;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async selected_wareHouse(whsCode: string) {
    const token = await this.get_sapToken();
    const path = '/Warehouses';
    const logic = `?$select=WarehouseCode,WarehouseName,U_QC_Required&$filter=WarehouseCode eq '${whsCode}'`;

    try {
      const warehouse = await axios.get(this.sapBase + path + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      return warehouse.data.value[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create_goodsReceiptPO(
    po: string,
    line: number,
    quantity: number,
    batch: string,
    warehouse: string,
  ) {
    const check_poEntry = await this.check_purchaseOrder(po);
    const selected_poEntry = check_poEntry.docEntry;

    const token = await this.get_sapToken();
    const path = '/PurchaseDeliveryNotes';
    const body = {
      BPL_IDAssignedToInvoice: 1,
      DocumentLines: [
        {
          BaseEntry: selected_poEntry,
          BaseLine: line,
          BaseType: 22,
          SerialNum: batch,
          Quantity: quantity,
          WarehouseCode: warehouse,
          BatchNumbers: [
            {
              BatchNumber: batch,
              Quantity: quantity,
            },
          ],
        },
      ],
    };

    try {
      const createdGRN = await axios.post(this.sapBase + path, body, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      return createdGRN.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async get_latestGRN() {
    const token = await this.get_sapToken();
    const path = '/PurchaseDeliveryNotes';
    const logic = '?$orderby=DocEntry desc&$top=5';

    try {
      const latestGRN = await axios.get(this.sapBase + path + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      return latestGRN.data.value;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async get_latestIVR() {
    const token = await this.get_sapToken();
    const path = '/StockTransfers';
    const logic = '?$orderby=DocEntry desc&$top=5';

    try {
      const latestIVR = await axios.get(this.sapBase + path + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      return latestIVR.data.value;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async create_inventryTransfer(dto: CreateIVRDto) {
    const token = await this.get_sapToken();
    const path = '/StockTransfers';
    const body = {
      StockTransferLines: [
        {
          ItemCode: dto.ItemCode,
          WarehouseCode: dto.WarehouseCode,
          FromWarehouseCode: dto.FromWarehouseCode,
          Quantity: dto.Quantity,
          SerialNumber: dto.SerialNumber,
        },
      ],
    };

    try {
      const createdIVR = await axios.post(this.sapBase + path, body, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      return createdIVR.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

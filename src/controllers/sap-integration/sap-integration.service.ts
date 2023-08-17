import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { ItemParameterService } from '../item-parameter/item-parameter.service';

@Injectable()
export class SapIntegrationService {
  constructor(private readonly itemParameterService: ItemParameterService) {}

  private sapBase = 'https://35.213.141.233:50000/b1s/v2';

  async login_sapServer() {
    const hanaCredentials = {
      CompanyDB: 'SBODEMOUS',
      UserName: 'manager',
      Password: '1234',
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

  async get_qcItems(token: string) {
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

  async get_purchaseOrders(token: string) {
    const path = '/PurchaseOrders';
    const logic =
      "?$select=DocNum,Supplier,DocumentLines&$filter=DocumentStatus ne 'C'";

    try {
      const getPOs = await axios.get(this.sapBase + path + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      return getPOs.data.value;
    } catch (error) {
      throw error;
    }
  }

  async selected_purchaseOrder(token: string, poNumber: string) {
    const path = '/PurchaseOrders';
    const id = `(${poNumber})`;
    const logic = '?$select=DocumentLines';

    try {
      const selectedPo = await axios.get(this.sapBase + path + id + logic, {
        headers: { Cookie: `B1SESSION=${token}` },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      const itemData_set = await Promise.all(
        selectedPo.data.DocumentLines.map(async (item) => {
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
}

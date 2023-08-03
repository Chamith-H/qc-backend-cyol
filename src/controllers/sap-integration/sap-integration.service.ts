import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';

@Injectable()
export class SapIntegrationService {
  constructor() {}

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
      throw error
    }
  }
}

import {
  Controller,
  Param,
  Get,
  Res,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { SapIntegrationService } from './sap-integration.service';
import { Response } from 'express';
import { CreateGRNDto } from './sap-integration.dto';

@Controller('sap-integration')
export class SapIntegrationController {
  constructor(private readonly sapIntegrationService: SapIntegrationService) {}

  @Get('create')
  async create_Sap() {
    return await this.sapIntegrationService.create_sapSession();
  }

  @Get('login')
  async sapLogin(@Res() res: Response) {
    const response = await this.sapIntegrationService.login_sapServer();
    if (response) {
      res.status(response.statusCode).jsonp(response);
    }
  }

  @Get('items')
  async sapItems(@Headers('sessionId') session: string, @Res() res: Response) {
    const response = await this.sapIntegrationService.get_qcItems();
    if (response) {
      res.status(200).jsonp(response);
    }
  }

  @Get('selected/:po')
  async checkedPo(
    @Headers('sessionId') session: string,
    @Param('po') po: string,
    @Res() res: Response,
  ) {
    const response = await this.sapIntegrationService.check_purchaseOrder(po);

    if (response) {
      res.status(200).jsonp(response);
    }
  }

  @Get('poData/:po')
  async selectedPo(
    @Headers('sessionId') session: string,
    @Param('po') po: string,
    @Res() res: Response,
  ) {
    const response = await this.sapIntegrationService.selected_purchaseOrder(
      po,
    );

    if (response) {
      res.status(200).jsonp(response);
    }
  }

  @Post('create-grn')
  async CreateGRN(@Body() dto: CreateGRNDto, @Res() res: Response) {
    const response = await this.sapIntegrationService.create_goodsReceiptPO(
      dto.po,
      dto.line,
      dto.quantity,
      dto.batch,
      dto.warehouse,
    );
    if (response) {
      console.log(response);
      res.status(200).jsonp({ message: 'GRN created successfully' });
    }
  }

  @Post('inventry-transfer')
  async createTransfer() {
    return await this.sapIntegrationService.transfer_toInventry();
  }
}

import { Controller, Post, Get, Res, Headers } from '@nestjs/common';
import { SapIntegrationService } from './sap-integration.service';
import { Response } from 'express';

@Controller('sap-integration')
export class SapIntegrationController {
    constructor(private readonly sapIntegrationService: SapIntegrationService) {}

    @Get('login')
    async sapLogin(@Res() res: Response) {
        const response = await this.sapIntegrationService.login_sapServer()
        if (response) {
            res.status(response.statusCode).jsonp(response)
        }
    }

    @Get('items')
    async sapItems(@Headers('sessionId') session: string, @Res() res: Response) {
        const response = await this.sapIntegrationService.get_qcItems(session)
        if(response) {
            res.status(200).jsonp(response)
        }
    }
}

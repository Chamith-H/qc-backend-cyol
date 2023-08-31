import { Controller, Post, Body } from '@nestjs/common';
import { SapHookService } from './sap-hook.service';

@Controller('sap-hook')
export class SapHookController {
    constructor(private readonly sapHookService: SapHookService) {}

    // @Post('latest-Grn')
}

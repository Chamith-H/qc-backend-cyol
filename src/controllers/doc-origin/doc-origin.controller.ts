import { Controller, Post, Body } from '@nestjs/common';
import { DocOriginService } from './doc-origin.service';
import { CreatedRequestDto } from './doc-origin.dto';

@Controller('doc-origin')
export class DocOriginController {
    constructor(private readonly docOriginService: DocOriginService) {}

    @Post('update')
    async updateDoc(@Body() dto: CreatedRequestDto) {
        return await this.docOriginService.update_OriginTransaction(dto)
    }
}

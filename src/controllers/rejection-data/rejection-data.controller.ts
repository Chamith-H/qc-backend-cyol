import { Controller, Post, Body } from '@nestjs/common';
import { RejectionDataService } from './rejection-data.service';
import { HandleRejectionDto } from './rejection-data.dto';

@Controller('rejection-data')
export class RejectionDataController {
    constructor(private readonly rejectionDataServise: RejectionDataService) {}

    @Post('second-inspection') 
    async secondInspection(@Body() dto: HandleRejectionDto) {
        return await this.rejectionDataServise.transfer_secondInspection(dto)
    }

    @Post('give-approval')
    async giveApproval(@Body() dto: HandleRejectionDto) {
        return await this.rejectionDataServise.approve_secondTransfer(dto)
    }

    @Post('manually-reject')
    async rejectManually(@Body() dto: HandleRejectionDto) {
        return await this.rejectionDataServise.manually_rejectItems(dto)
    }

    @Post('transfer-list')
    async transferList(@Body() dto: HandleRejectionDto) {
        return await this.rejectionDataServise.tranfer_toRejectedTable(dto)
    }
}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RejectionDataService } from './rejection-data.service';
import { HandleRejectionDto } from './rejection-data.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('rejection-data')
export class RejectionDataController {
    constructor(private readonly rejectionDataServise: RejectionDataService) {}

    @Post('second-inspection') 
    async secondInspection(@Body() dto: HandleRejectionDto) {
        return await this.rejectionDataServise.transfer_secondInspection(dto)
    }

    @Post('give-approval')
    @UseGuards(JwtAuthGuard, new RbacRoleGuard(20))
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

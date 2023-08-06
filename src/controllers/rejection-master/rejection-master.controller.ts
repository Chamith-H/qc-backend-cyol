import { Controller, Post, Get, Body } from '@nestjs/common';
import { RejectionMasterService } from './rejection-master.service';
import { CreateRejectionMasterDto, FilterRejectionMasterDto } from './rejection-master.dto';

@Controller('rejection-master')
export class RejectionMasterController {
    constructor(private readonly rejectionMasterService: RejectionMasterService) {}
      
    @Post('add')
    async addRejection(@Body() dto: CreateRejectionMasterDto) {
        return await this.rejectionMasterService.add_newRejectionMaster(dto)
    }

    @Post('all')
    async getRejections(@Body() dto: FilterRejectionMasterDto) {
        return await this.rejectionMasterService.get_allRejectionMasters(dto)
    }
}

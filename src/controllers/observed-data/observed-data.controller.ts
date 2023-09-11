import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ObservedDataService } from './observed-data.service';
import { UpdateObservedDataDto } from './observed-data.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('observed-data')
export class ObservedDataController {
    constructor(private readonly observedDataService: ObservedDataService) {}

    @Post('update')
    @UseGuards(JwtAuthGuard, new RbacRoleGuard(16))
    async updateOvservedData(@Body() dto: UpdateObservedDataDto) {
        console.log(dto)
        return await this.observedDataService.update_ObservedData(dto)
    }
} 

import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, EditEquipmentDto } from './equipment.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post('add')
  async createUom(@Body() dto: CreateEquipmentDto) {
    return await this.equipmentService.add_newEquipment(dto);
  }

  @Get('all')
  async getEquipments() {
    return await this.equipmentService.get_allEquipments();
  }

  @Post('update')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(22))
  async updateEquipment(@Body() dto: EditEquipmentDto) {
    return await this.equipmentService.edit_currentUom(dto);
  }
}

import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { UomService } from './uom.service';
import { CreateUomDto, EditUomDto } from './uom.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('uom')
export class UomController {
  constructor(private readonly uomService: UomService) {}

  @Post('add')
  async createUom(@Body() dto: CreateUomDto) {
    return await this.uomService.add_newUom(dto);
  }

  @Get('all')
  async getUoms() {
    return await this.uomService.get_allUoms();
  }

  @Post('edit')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(24))
  async editUom(@Body() dto: EditUomDto) {
    return await this.uomService.edit_currentUom(dto);
  }
}

import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { ItemParameterService } from './item-parameter.service';
import {
  CreateItemParameterDto,
  FilterItemDto,
  InspectionParameterDto,
  SelectedItemDto,
} from './item-parameter.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('item-parameter')
export class ItemParameterController {
  constructor(private readonly itemParameterService: ItemParameterService) {}

  @Get('access')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard('3'))
  check_accessControl() {
    return { message: 'success' };
  }

  @Post('add')
  async addItemParameter(@Body() dto: CreateItemParameterDto) {
    return await this.itemParameterService.add_newItemParameter(dto);
  }

  @Get('codes')
  async getItemCodes() {
    return await this.itemParameterService.get_allCodes();
  }

  @Post('all')
  // @UseGuards(JwtAuthGuard, new RbacRoleGuard('977'))
  async getItemParameters(@Body() dto: FilterItemDto) {
    return await this.itemParameterService.get_allItemParameters(dto);
  }

  @Post('selected')
  async selectedParameter(@Body() dto: FilterItemDto) {
    return await this.itemParameterService.get_selectedParameter(dto);
  }

  @Post('choosed')
  async selectedItemsStage(@Body() dto: InspectionParameterDto) {
    return await this.itemParameterService.get_itemSelectedStage(dto);
  }
}

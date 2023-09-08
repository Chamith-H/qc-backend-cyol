import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { ItemParameterService } from './item-parameter.service';
import {
  CreateItemParameterDto,
  FilterItemDto,
  InspectionParameterDto,
  SelectedItemDto,
  SelectedStageDto,
  ValidateItemValueDto,
} from './item-parameter.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('item-parameter')
export class ItemParameterController {
  constructor(private readonly itemParameterService: ItemParameterService) {}

  @Get('access')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(3))
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

  @Post('validate')
  async validateValues(@Body() dto: ValidateItemValueDto) {
    return await this.itemParameterService.validate_masterData(dto);
  }

  @Post('selected-stage')
  async selectedStageParameters(@Body() dto: SelectedStageDto) {
    return await this.itemParameterService.get_itemCodes_SelectedStage(dto);
  }
}

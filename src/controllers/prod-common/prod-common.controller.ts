import { Controller, Post, Body } from '@nestjs/common';
import { ProdCommonService } from './prod-common.service';
import {
  AddTimeDto,
  CommonCreateDto,
  CreateItemDto,
  FilterMainDto,
  GetIdDto,
  ProdInspectionDto,
} from './prod-common.dto';

@Controller('prod-common')
export class ProdCommonController {
  constructor(private readonly prodCommonService: ProdCommonService) {}

  @Post('create')
  async createGranulation(@Body() dto: CommonCreateDto) {
    return await this.prodCommonService.create_granulationTest(dto);
  }

  @Post('all')
  async getMains(@Body() dto: FilterMainDto) {
    return await this.prodCommonService.get_allMains(dto);
  }

  @Post('get-shift')
  async getShift(@Body() dto: GetIdDto) {
    return await this.prodCommonService.get_expandShift(dto);
  }

  @Post('create-item')
  async createItem(@Body() dto: CreateItemDto) {
    return await this.prodCommonService.create_newItem(dto);
  }

  @Post('get-item')
  async getItem(@Body() dto: GetIdDto) {
    return await this.prodCommonService.get_selectedItem(dto);
  }

  @Post('add-time')
  async addTime(@Body() dto: AddTimeDto) {
    return await this.prodCommonService.create_inspectTime(dto);
  }

  @Post('selectedItem')
  async selectedItem(@Body() dto: GetIdDto) {
    return await this.prodCommonService.get_selectedItemList(dto);
  }

  @Post('inspect')
  async inspectItem(@Body() dto: ProdInspectionDto) {
    return await this.prodCommonService.update_qcInspection(dto);
  }

  @Post('complete-shift')
  async completeShift(@Body() dto: GetIdDto) {
    return await this.prodCommonService.complete_Shift(dto);
  }

  @Post('close-shift')
  async closeShift(@Body() dto: GetIdDto) {
    return await this.prodCommonService.close_currentShift(dto);
  }

  @Post('time-report')
  async timeReport(@Body() dto: GetIdDto) {
    return await this.prodCommonService.get_timeReport(dto);
  }

  @Post('main-report')
  async mainReport(@Body() dto: GetIdDto) {
    return await this.prodCommonService.get_finalReport(dto);
  }

  @Post('delete-time')
  async deleteTime(@Body() dto: GetIdDto) {
    return await this.prodCommonService.delete_inspectionTime(dto);
  }

  @Post('delete-item')
  async deleteItem(@Body() dto: GetIdDto) {
    return await this.prodCommonService.delete_inspectionItem(dto);
  }

  @Post('delete-shift')
  async deleteShift(@Body() dto: GetIdDto) {
    return await this.prodCommonService.delete_prodShift(dto);
  }
}

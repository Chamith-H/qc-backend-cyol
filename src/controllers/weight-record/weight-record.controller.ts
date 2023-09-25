import { Controller, Post, Body } from '@nestjs/common';
import { WeightRecordService } from './weight-record.service';
import {
  AddNewRecordDto,
  CreateTimeDto,
  FilterMainDto,
  GetShiftDto,
  TimeItemsDto,
  UpdateInspectionDto,
} from './weight-record.dto';

@Controller('weight-record')
export class WeightRecordController {
  constructor(private readonly weightRecordService: WeightRecordService) {}

  @Post('create')
  async createRecord(@Body() dto: AddNewRecordDto) {
    return await this.weightRecordService.create_newRecord(dto);
  }

  @Post('all-main')
  async getMainData(@Body() dto: FilterMainDto) {
    return await this.weightRecordService.get_allMains(dto);
  }

  @Post('time-create')
  async createTime(@Body() dto: CreateTimeDto) {
    return await this.weightRecordService.create_newTime(dto);
  }

  @Post('shift')
  async selectedShift(@Body() dto: GetShiftDto) {
    return await this.weightRecordService.get_shiftData(dto);
  }

  @Post('time-status')
  async updateTime(@Body() dto: GetShiftDto) {
    return await this.weightRecordService.update_inspectTime(dto);
  }

  @Post('time-items')
  async createItem(@Body() dto: TimeItemsDto) {
    return await this.weightRecordService.add_timeItems(dto);
  }

  @Post('selectedItem')
  async selectedItem(@Body() dto: GetShiftDto) {
    return await this.weightRecordService.get_selectedItem(dto);
  }

  @Post('inspect')
  async inspectItem(@Body() dto: UpdateInspectionDto) {
    return await this.weightRecordService.update_qcInspection(dto);
  }
}

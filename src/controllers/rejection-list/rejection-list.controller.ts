import { Controller, Body, Post } from '@nestjs/common';
import { RejectionListService } from './rejection-list.service';
import { FilterRejectListDto } from './rejection-list.dto';

@Controller('rejection-list')
export class RejectionListController {
  constructor(private readonly rejectListService: RejectionListService) {}

  @Post('all')
  async getFullList(@Body() dto: FilterRejectListDto) {
    return await this.rejectListService.get_allRejectLists(dto);
  }
}

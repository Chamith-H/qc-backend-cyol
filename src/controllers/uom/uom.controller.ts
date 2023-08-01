import { Controller, Post, Get, Body } from '@nestjs/common';
import { UomService } from './uom.service';
import { CreateUomDto } from './uom.dto';

@Controller('uom')
export class UomController {
  constructor(private readonly uomService: UomService) {}

  @Post('add')
  async createUom(@Body() dto: CreateUomDto) {
    return await this.uomService.add_newUom(dto);
  }

  @Get('all')
  async getUoms() {
    return await this.uomService.get_allUoms()
  }
}

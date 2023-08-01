import { Controller, Body, Post, Get } from '@nestjs/common';
import { ItemParameterService } from './item-parameter.service';
import { CreateItemParameterDto, InspectionParameterDto, SelectedItemDto } from './item-parameter.dto';

@Controller('item-parameter')
export class ItemParameterController {
    constructor(private readonly itemParameterService: ItemParameterService) {}

    @Post('add')
    async addItemParameter(@Body() dto: CreateItemParameterDto) {
        return await this.itemParameterService.add_newItemParameter(dto)
    }

    @Get('all')
    async getItemParameters() {
        return await this.itemParameterService.get_allItemParameters()
    }
}

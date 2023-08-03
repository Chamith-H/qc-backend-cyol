import { Controller, Body, Post, Get } from '@nestjs/common';
import { ItemParameterService } from './item-parameter.service';
import { CreateItemParameterDto, FilterItemDto, InspectionParameterDto, SelectedItemDto } from './item-parameter.dto';

@Controller('item-parameter')
export class ItemParameterController {
    constructor(private readonly itemParameterService: ItemParameterService) {}

    @Post('add')
    async addItemParameter(@Body() dto: CreateItemParameterDto) {
        return await this.itemParameterService.add_newItemParameter(dto)
    }

    @Post('all')
    async getItemParameters(@Body() dto: FilterItemDto) {
        return await this.itemParameterService.get_allItemParameters(dto)
    }

    @Post('selected')
    async selectedParameter(@Body() dto: FilterItemDto) {
        return await this.itemParameterService.get_selectedParameter(dto)
    }

    @Post('choosed')
    async selectedItemsStage(@Body() dto: InspectionParameterDto) {
        return await this.itemParameterService.get_itemSelectedStage(dto)
    }
}

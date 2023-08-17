import { Controller, Get, Post, Body } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto, FilterTokenDto } from './token.dto';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService){}

    @Post('create')
    async generateToken(@Body() dto: CreateTokenDto) {
        return this.tokenService.create_newToken(dto)
    }

    @Post('all')
    async getTokens(@Body() dto: FilterTokenDto) {
        return await this.tokenService.get_allTokens(dto)
    }
}

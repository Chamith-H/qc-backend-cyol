import { Controller, Get, Post, Body } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './token.dto';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService){}

    @Post('create')
    async generateToken(@Body() dto: CreateTokenDto) {
        return this.tokenService.create_newToken(dto)
    }
}

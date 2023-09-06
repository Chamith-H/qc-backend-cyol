import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto, FilterTokenDto } from './token.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('access')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(18))
  check_accessControl() {
    return { message: 'success' };
  }

  @Post('create')
  async generateToken(@Body() dto: CreateTokenDto) {
    return this.tokenService.create_newToken(dto);
  }

  @Post('all')
  async getTokens(@Body() dto: FilterTokenDto) {
    return await this.tokenService.get_allTokens(dto);
  }
}

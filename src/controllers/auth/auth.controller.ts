import {
  Controller,
  HttpCode,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('access')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard('1'))
  check_accessControl() {
    return { message: 'Success' };
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard('1'))
  async register(@Body() dto: RegisterDto) {
    return await this.authService.create_newUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return await this.authService.login_currentUser(dto);
  }

  @Get('all')
  async users() {
    return await this.authService.get_allUsers();
  }

  @Get('selected/:id')
  async user(@Param('id') id: string) {
    return await this.authService.get_selectedUser(id);
  }
}

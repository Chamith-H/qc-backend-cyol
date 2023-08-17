import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('access-control')
export class AccessControlController {
  @UseGuards(JwtAuthGuard, new RbacRoleGuard('40'))
  @Get('check')
  check_AccessControl() {
    return { message: 'allow to access' };
  }
}

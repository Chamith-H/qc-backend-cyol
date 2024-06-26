import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';

@Controller('access-control')
export class AccessControlController {
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(1))
  @Get('check')
  check_AccessControl() {

    // for access controlls to check
    return { message: 'allow to access' };
  }
}

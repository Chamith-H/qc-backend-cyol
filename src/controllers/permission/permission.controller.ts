import { Controller, Post, Body, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  async createPermission(@Body() dto: CreatePermissionDto) {
    return await this.permissionService.create_newPermission(dto);
  }

  @Get('all')
  async getPermissions() {
    return await this.permissionService.get_allPermissions()
  }
}

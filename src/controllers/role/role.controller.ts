import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, SelectedRoleDto, UpdateRoleDto } from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('add')
  async createRole(@Body() dto: CreateRoleDto) {
    console.log(dto);
    return await this.roleService.create_newRole(dto);
  }

  @Get('all')
  async allRoles() {
    return await this.roleService.get_allRoles();
  }

  @Post('selected')
  async selectedRole(@Body() dto: SelectedRoleDto) {
    return await this.roleService.get_selectedRole(dto);
  }

  @Post('update')
  async updateRole(@Body() dto: UpdateRoleDto) {
    return await this.roleService.update_selectedRole(dto);
  }
}

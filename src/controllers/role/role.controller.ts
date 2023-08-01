import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}
    @Post('add')
    async createRole(@Body() dto: CreateRoleDto) {
        return await this.roleService.create_newRole(dto)
    }

    @Get('all')
    async allRoles() {
        return await this.roleService.get_allRoles()
    }
}

import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/schemas/auth/role.schema';
import { CreateRoleDto, SelectedRoleDto, UpdateRoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  //--> Create new Role ---------------------------------------------------------------<
  async create_newRole(dto: CreateRoleDto) {
    const existRole = await this.roleModel.findOne({
      roleName: dto.roleName,
    });
    if (existRole !== null) {
      throw new BadRequestException('This role name is already exist');
    }

    const permissionObject = {
      permissions: dto.permissions.map((permission) => permission.id),
    };

    const createRole = {
      roleName: dto.roleName,
      permissions: permissionObject.permissions,
    };
    const newRole = new this.roleModel(createRole);
    return await newRole.save();
  }

  //--> Get all roles -----------------------------------------------------------------<
  async get_allRoles() {
    const roles = await this.roleModel
      .find({})
      .populate({ path: 'permissions' })
      .exec();

    return roles;
  }

  async get_selectedRole(dto: SelectedRoleDto) {
    const roleData = await this.roleModel
      .findOne({ roleName: dto.roleName })
      .populate({ path: 'permissions' })
      .exec();

    return roleData.permissions;
  }

  async update_selectedRole(dto: UpdateRoleDto) {
    const response = await this.roleModel.updateOne(
      { roleName: dto.roleName },
      { $set: { permissions: dto.permissions } },
    );

    if (response.modifiedCount !== 1) {
      throw new ConflictException('Nothing to update');
    }

    return { message: 'ok' };
  }
}

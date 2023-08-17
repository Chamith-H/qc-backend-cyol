import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/schemas/auth/role.schema';
import { CreateRoleDto } from './role.dto';

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
    const newRole = new this.roleModel(dto);
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
}

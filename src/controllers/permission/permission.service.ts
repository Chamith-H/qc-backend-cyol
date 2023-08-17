import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Permission,
  PermissionDocument,
} from 'src/schemas/auth/permission.schema';
import { CreatePermissionDto } from './permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  async create_newPermission(dto: CreatePermissionDto) {
    const newPermission = new this.permissionModel(dto);
    return await newPermission.save();
  }

  async get_allPermissions() {
    return await this.permissionModel.find({})
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Uom, UomDocument } from 'src/schemas/qc-parameter/uom.schema';
import { DeleteByOneDto } from './action-delete.dto';
import {
  QcParameter,
  QcParameterDocument,
} from 'src/schemas/qc-parameter/qc-parameter.schema';
import {
  Equipment,
  EquipmentDocument,
} from 'src/schemas/qc-parameter/equipment.schema';
import {
  StandardData,
  StandardDataDocument,
} from 'src/schemas/item-parameter/standard-data.schema';
import {
  Rejection,
  RejectionDocument,
} from 'src/schemas/rejection/rejection-master.schema';
import {
  Cancellation,
  CancellationDocument,
} from 'src/schemas/cancellation/cancellation-master.schema';
import { Role, RoleDocument } from 'src/schemas/auth/role.schema';
import { User, UserDocument } from 'src/schemas/auth/user.schema';

@Injectable()
export class ActionDeleteService {
  constructor(
    @InjectModel(Uom.name)
    private readonly uomModel: Model<UomDocument>,

    @InjectModel(QcParameter.name)
    private readonly qcParameterModel: Model<QcParameterDocument>,

    @InjectModel(Equipment.name)
    private readonly equipmentModel: Model<EquipmentDocument>,

    @InjectModel(StandardData.name)
    private readonly standardDataModel: Model<StandardDataDocument>,

    @InjectModel(Rejection.name)
    private readonly rejectionModel: Model<RejectionDocument>,

    @InjectModel(Cancellation.name)
    private readonly cancellationModel: Model<CancellationDocument>,

    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async delete_selectedUOM(dto: DeleteByOneDto) {
    const exist = await this.qcParameterModel.findOne({ uom: dto.id });

    if (exist) {
      throw new ConflictException(
        `You cannot delete this UOM because, QC parameter = ${exist.name} is using this`,
      );
    }

    const deleteAction = await this.uomModel.deleteOne({ _id: dto.id });
    if (deleteAction.deletedCount !== 1) {
      throw new ConflictException('Error deleting!');
    }

    return { massage: 'ok' };
  }

  async delete_selectedEquipment(dto: DeleteByOneDto) {
    const exist = await this.qcParameterModel.findOne({ equipment: dto.id });

    if (exist) {
      throw new ConflictException(
        `You cannot delete this Equipment because, QC parameter = ${exist.name} is using this`,
      );
    }

    const deleteAction = await this.equipmentModel.deleteOne({ _id: dto.id });
    if (deleteAction.deletedCount !== 1) {
      throw new ConflictException('Error deleting!');
    }

    return { massage: 'ok' };
  }

  async delete_qcParameter(dto: DeleteByOneDto) {
    const exist = await this.standardDataModel.findOne({ parameterId: dto.id });

    if (exist) {
      throw new ConflictException(
        'Cannot delete this QC Parameter, because some items using this',
      );
    }

    const deleteAction = await this.qcParameterModel.deleteOne({ _id: dto.id });
    if (deleteAction.deletedCount !== 1) {
      throw new ConflictException('Error deleting!');
    }

    return { massage: 'ok' };
  }

  async delete_rejections(dto: DeleteByOneDto) {
    const deleteAction = await this.rejectionModel.deleteOne({ _id: dto.id });
    if (deleteAction.deletedCount !== 1) {
      throw new ConflictException('Error deleting!');
    }

    return { massage: 'ok' };
  }

  async delete_cancellations(dto: DeleteByOneDto) {
    const deleteAction = await this.cancellationModel.deleteOne({
      _id: dto.id,
    });
    if (deleteAction.deletedCount !== 1) {
      throw new ConflictException('Error deleting!');
    }

    return { massage: 'ok' };
  }

  async delete_user(dto: DeleteByOneDto) {
    const deleteAction = await this.userModel.deleteOne({
      _id: dto.id,
    });
    if (deleteAction.deletedCount !== 1) {
      throw new ConflictException('Error deleting!');
    }

    return { massage: 'ok' };
  }

  async delete_role(dto: DeleteByOneDto) {
    const exist = await this.userModel.findOne({ role: dto.id });

    if (exist) {
      throw new ConflictException(
        'Cannot delete this role, because some users are using this role',
      );
    }

    const deleteAction = await this.roleModel.deleteOne({
      _id: dto.id,
    });
    if (deleteAction.deletedCount !== 1) {
      throw new ConflictException('Error deleting!');
    }

    return { massage: 'ok' };
  }
}

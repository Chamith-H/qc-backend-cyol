import { Module } from '@nestjs/common';
import { ActionDeleteController } from './action-delete.controller';
import { ActionDeleteService } from './action-delete.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Uom, UomSchema } from 'src/schemas/qc-parameter/uom.schema';
import {
  QcParameter,
  QcParameterSchema,
} from 'src/schemas/qc-parameter/qc-parameter.schema';
import {
  Equipment,
  EquipmentSchema,
} from 'src/schemas/qc-parameter/equipment.schema';
import {
  StandardData,
  StandardDataSchema,
} from 'src/schemas/item-parameter/standard-data.schema';
import {
  Rejection,
  RejectionSchema,
} from 'src/schemas/rejection/rejection-master.schema';
import {
  Cancellation,
  CancellationSchema,
} from 'src/schemas/cancellation/cancellation-master.schema';
import { Role, RoleSchema } from 'src/schemas/auth/role.schema';
import { User, UserSchema } from 'src/schemas/auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Uom.name, schema: UomSchema }]),

    MongooseModule.forFeature([
      { name: QcParameter.name, schema: QcParameterSchema },
    ]),

    MongooseModule.forFeature([
      { name: Equipment.name, schema: EquipmentSchema },
    ]),

    MongooseModule.forFeature([
      { name: StandardData.name, schema: StandardDataSchema },
    ]),

    MongooseModule.forFeature([
      { name: Rejection.name, schema: RejectionSchema },
    ]),

    MongooseModule.forFeature([
      { name: Cancellation.name, schema: CancellationSchema },
    ]),

    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  controllers: [ActionDeleteController],
  providers: [ActionDeleteService],
})
export class ActionDeleteModule {}

import { Controller, Post, Body } from '@nestjs/common';
import { ActionDeleteService } from './action-delete.service';
import { DeleteByOneDto } from './action-delete.dto';
import { JwtAuthGuard } from 'src/configs/guards/jwt-auth.guard';
import { RbacRoleGuard } from 'src/configs/guards/rbac-role.guard';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('action-delete')
export class ActionDeleteController {
  constructor(private readonly deleteService: ActionDeleteService) {}

  @Post('uom')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(23))
  async deleteUOM(@Body() dto: DeleteByOneDto) {
    return await this.deleteService.delete_selectedUOM(dto);
  }

  @Post('equipment')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(21))
  async deleteEquipment(@Body() dto: DeleteByOneDto) {
    return await this.deleteService.delete_selectedEquipment(dto);
  }

  @Post('qc-parameter')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(7))
  async deleteQcParameter(@Body() dto: DeleteByOneDto) {
    return await this.deleteService.delete_qcParameter(dto);
  }

  @Post('rejection')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(9))
  async deleteRejection(@Body() dto: DeleteByOneDto) {
    return await this.deleteService.delete_rejections(dto);
  }

  @Post('cancellation')
  @UseGuards(JwtAuthGuard, new RbacRoleGuard(13))
  async deleteCancellation(@Body() dto: DeleteByOneDto) {
    return await this.deleteService.delete_cancellations(dto);
  }

  @Post('user')
  async deleteUser(@Body() dto: DeleteByOneDto) {
    return await this.deleteService.delete_user(dto);
  }

  @Post('role')
  async deleteRole(@Body() dto: DeleteByOneDto) {
    return await this.deleteService.delete_role(dto);
  }
}

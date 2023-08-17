import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RbacRoleGuard implements CanActivate {
  constructor(private requiredPermissionId: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role || !user.role.permissions) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const hasPermission = user.role.permissions.some(
      (permission) => permission.id === this.requiredPermissionId,
    );

    if (!hasPermission) {
      throw new UnauthorizedException('You do not have proper permission to proceed with the clicked action.');
    }

    return true;
  }
}

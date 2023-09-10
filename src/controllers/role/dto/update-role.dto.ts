import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty()
  roleName: string;

  @IsNotEmpty()
  permissions: string[];
}

import { IsNotEmpty, IsString } from 'class-validator';

export class SelectedRoleDto {
  @IsNotEmpty()
  roleName: string;
}

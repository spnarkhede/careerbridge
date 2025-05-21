import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

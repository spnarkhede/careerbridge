import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

@InputType()
export class RegisterDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @Field()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @Field(() => UserRole)
  @IsEnum(UserRole, { message: 'Invalid role' })
  @IsNotEmpty({ message: 'Role is required' })
  role: UserRole;
}

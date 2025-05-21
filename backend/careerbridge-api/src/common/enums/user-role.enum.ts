import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'admin',
  ORGANIZATION = 'organization',
  JOB_SEEKER = 'job_seeker',
  STUDENT = 'student',
  EMPLOYEE = 'employee',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'The role of the user in the system',
});

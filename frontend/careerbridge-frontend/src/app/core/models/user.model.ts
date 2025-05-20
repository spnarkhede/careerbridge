export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  title?: string;
  company?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYER = 'employer',
  EMPLOYEE = 'employee',
  JOB_SEEKER = 'job_seeker',
  STUDENT = 'student'
}

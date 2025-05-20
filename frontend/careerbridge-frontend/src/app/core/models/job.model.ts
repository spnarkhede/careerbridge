export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  postedDate: Date;
  deadline?: Date;
  status: JobStatus;
  companyLogo?: string;
  tags: string[];
}

export enum EmploymentType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  FREELANCE = 'Freelance',
  INTERNSHIP = 'Internship',
  TEMPORARY = 'Temporary'
}

export enum ExperienceLevel {
  ENTRY = 'Entry Level',
  JUNIOR = 'Junior',
  MID = 'Mid-Level',
  SENIOR = 'Senior',
  LEAD = 'Lead',
  EXECUTIVE = 'Executive'
}

export enum JobStatus {
  ACTIVE = 'Active',
  CLOSED = 'Closed',
  DRAFT = 'Draft'
}

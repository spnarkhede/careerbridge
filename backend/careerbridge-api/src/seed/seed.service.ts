import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Organization } from '../organizations/entities/organization.entity';
import { Job, JobType, JobVisibility } from '../jobs/entities/job.entity';
import { UserRole } from '../common/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async onModuleInit() {
    // Only seed in development environment
    if (process.env.NODE_ENV !== 'production') {
      await this.seed();
    }
  }

  async seed() {
    await this.seedUsers();
    await this.seedOrganizations();
    await this.seedJobs();
  }

  async seedUsers() {
    const count = await this.usersRepository.count();
    if (count > 0) {
      return; // Skip if users already exist
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = [
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@careerbridge.com',
        password: hashedPassword,
        role: UserRole.ADMIN,
        isEmailVerified: true,
        isActive: true,
      },
      {
        firstName: 'Organization',
        lastName: 'Manager',
        email: 'org@careerbridge.com',
        password: hashedPassword,
        role: UserRole.ORGANIZATION,
        isEmailVerified: true,
        isActive: true,
      },
      {
        firstName: 'Job',
        lastName: 'Seeker',
        email: 'jobseeker@careerbridge.com',
        password: hashedPassword,
        role: UserRole.JOB_SEEKER,
        isEmailVerified: true,
        isActive: true,
      },
      {
        firstName: 'Student',
        lastName: 'User',
        email: 'student@careerbridge.com',
        password: hashedPassword,
        role: UserRole.STUDENT,
        isEmailVerified: true,
        isActive: true,
      },
      {
        firstName: 'Employee',
        lastName: 'User',
        email: 'employee@careerbridge.com',
        password: hashedPassword,
        role: UserRole.EMPLOYEE,
        isEmailVerified: true,
        isActive: true,
      },
    ];

    await this.usersRepository.save(users);
    console.log('Users seeded successfully');
  }

  async seedOrganizations() {
    const count = await this.organizationsRepository.count();
    if (count > 0) {
      return; // Skip if organizations already exist
    }

    const organizations = [
      {
        name: 'Tech Innovations Inc.',
        description:
          'A leading technology company focused on innovation and digital transformation.',
        logo: 'https://example.com/logo1.png',
        website: 'https://techinnovations.example.com',
        industry: 'Technology',
        size: '1000-5000',
        location: 'San Francisco, CA',
        contactEmail: 'contact@techinnovations.example.com',
        contactPhone: '+1-555-123-4567',
        isActive: true,
      },
      {
        name: 'Global Healthcare Solutions',
        description:
          'Providing cutting-edge healthcare solutions and services worldwide.',
        logo: 'https://example.com/logo2.png',
        website: 'https://healthcare.example.com',
        industry: 'Healthcare',
        size: '5000-10000',
        location: 'Boston, MA',
        contactEmail: 'contact@healthcare.example.com',
        contactPhone: '+1-555-987-6543',
        isActive: true,
      },
    ];

    await this.organizationsRepository.save(organizations);
    console.log('Organizations seeded successfully');
  }

  async seedJobs() {
    const count = await this.jobsRepository.count();
    if (count > 0) {
      return; // Skip if jobs already exist
    }

    const organizations = await this.organizationsRepository.find();
    if (organizations.length === 0) {
      console.log('No organizations found, skipping job seeding');
      return;
    }

    const techOrgId = organizations[0].id;
    const healthcareOrgId = organizations[1].id;

    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3);

    const jobs = [
      {
        title: 'Senior Software Engineer',
        description:
          'We are looking for a Senior Software Engineer to join our team and help build innovative solutions.',
        type: JobType.FULL_TIME,
        location: 'San Francisco, CA',
        visibility: JobVisibility.PUBLIC,
        salary: '$120,000 - $150,000',
        applicationDeadline: futureDate,
        organizationId: techOrgId,
        isActive: true,
      },
      {
        title: 'Frontend Developer',
        description:
          'Join our UI/UX team to create beautiful and responsive web applications.',
        type: JobType.FULL_TIME,
        location: 'Remote',
        visibility: JobVisibility.PUBLIC,
        salary: '$90,000 - $110,000',
        applicationDeadline: futureDate,
        organizationId: techOrgId,
        isActive: true,
      },
      {
        title: 'DevOps Engineer',
        description:
          'Help us build and maintain our cloud infrastructure and CI/CD pipelines.',
        type: JobType.FULL_TIME,
        location: 'San Francisco, CA',
        visibility: JobVisibility.PUBLIC,
        salary: '$110,000 - $130,000',
        applicationDeadline: futureDate,
        organizationId: techOrgId,
        isActive: true,
      },
      {
        title: 'Product Manager',
        description:
          'Lead product development and strategy for our core platform.',
        type: JobType.FULL_TIME,
        location: 'San Francisco, CA',
        visibility: JobVisibility.INTERNAL,
        salary: '$130,000 - $160,000',
        applicationDeadline: futureDate,
        organizationId: techOrgId,
        isActive: true,
      },
      {
        title: 'UX Designer Intern',
        description: 'Join our design team for a summer internship program.',
        type: JobType.INTERNSHIP,
        location: 'San Francisco, CA',
        visibility: JobVisibility.PUBLIC,
        salary: '$30/hour',
        applicationDeadline: futureDate,
        organizationId: techOrgId,
        isActive: true,
      },
      {
        title: 'Medical Research Scientist',
        description:
          'Conduct research on innovative healthcare solutions and treatments.',
        type: JobType.FULL_TIME,
        location: 'Boston, MA',
        visibility: JobVisibility.PUBLIC,
        salary: '$140,000 - $170,000',
        applicationDeadline: futureDate,
        organizationId: healthcareOrgId,
        isActive: true,
      },
      {
        title: 'Healthcare Data Analyst',
        description:
          'Analyze healthcare data to improve patient outcomes and operational efficiency.',
        type: JobType.FULL_TIME,
        location: 'Boston, MA',
        visibility: JobVisibility.PUBLIC,
        salary: '$90,000 - $110,000',
        applicationDeadline: futureDate,
        organizationId: healthcareOrgId,
        isActive: true,
      },
      {
        title: 'Clinical Trial Coordinator',
        description:
          'Coordinate and manage clinical trials for new treatments and medications.',
        type: JobType.CONTRACT,
        location: 'Remote',
        visibility: JobVisibility.PUBLIC,
        salary: '$80,000 - $95,000',
        applicationDeadline: futureDate,
        organizationId: healthcareOrgId,
        isActive: true,
      },
      {
        title: 'Healthcare IT Specialist',
        description:
          'Maintain and improve healthcare information systems and infrastructure.',
        type: JobType.FULL_TIME,
        location: 'Boston, MA',
        visibility: JobVisibility.INTERNAL,
        salary: '$100,000 - $120,000',
        applicationDeadline: futureDate,
        organizationId: healthcareOrgId,
        isActive: true,
      },
      {
        title: 'Part-time Medical Receptionist',
        description:
          'Assist with patient check-in and administrative tasks at our Boston clinic.',
        type: JobType.PART_TIME,
        location: 'Boston, MA',
        visibility: JobVisibility.PUBLIC,
        salary: '$25/hour',
        applicationDeadline: futureDate,
        organizationId: healthcareOrgId,
        isActive: true,
      },
    ];

    await this.jobsRepository.save(jobs);
    console.log('Jobs seeded successfully');
  }
}

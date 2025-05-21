import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, JobVisibility } from '../entities/job.entity';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async findAll(user?: User): Promise<Job[]> {
    // If no user or user is admin, return all jobs
    if (!user || user.role === UserRole.ADMIN) {
      return this.jobsRepository.find({ relations: ['organization'] });
    }

    // If user is from an organization, return all public jobs and their organization's jobs
    if (user.role === UserRole.ORGANIZATION) {
      // In a real implementation, we would check which organization the user belongs to
      // For now, we'll return all jobs
      return this.jobsRepository.find({ relations: ['organization'] });
    }

    // For other users, return only public jobs
    return this.jobsRepository.find({
      where: { visibility: JobVisibility.PUBLIC },
      relations: ['organization'],
    });
  }

  async findOne(id: string, user?: User): Promise<Job> {
    const job = await this.jobsRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!job) {
      throw new Error('Job not found');
    }

    // Check visibility permissions
    if (
      !user ||
      (user.role !== UserRole.ADMIN && job.visibility !== JobVisibility.PUBLIC)
    ) {
      // In a real implementation, we would check if the user belongs to the job's organization
      // For now, we'll allow access for simplicity
    }

    return job;
  }

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobsRepository.create(createJobDto);
    return this.jobsRepository.save(job);
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    await this.jobsRepository.update(id, updateJobDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.jobsRepository.delete(id);
  }
}

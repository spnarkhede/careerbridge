import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { JobsService } from '../services/jobs.service';
import { Job, JobVisibility } from '../entities/job.entity';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

@Resolver(() => Job)
export class JobsResolver {
  constructor(private jobsService: JobsService) {}

  @Query(() => [Job])
  async jobs(@CurrentUser() user?: User): Promise<Job[]> {
    return this.jobsService.findAll(user);
  }

  @Query(() => Job)
  async job(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user?: User,
  ): Promise<Job> {
    return this.jobsService.findOne(id, user);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZATION)
  @Mutation(() => Job)
  async createJob(
    @CurrentUser() user: User,
    @Args('createJobInput') createJobDto: CreateJobDto,
  ): Promise<Job> {
    // Only admins and organization users can create jobs
    // In a real implementation, we would check if the user belongs to the organization
    return this.jobsService.create(createJobDto);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZATION)
  @Mutation(() => Job)
  async updateJob(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
    @Args('updateJobInput') updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    // In a real implementation, we would check if the user belongs to the job's organization
    // For now, we're allowing any organization role to update
    return this.jobsService.update(id, updateJobDto);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZATION)
  @Mutation(() => Boolean)
  async deleteJob(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    // In a real implementation, we would check if the user belongs to the job's organization
    await this.jobsService.remove(id);
    return true;
  }
}

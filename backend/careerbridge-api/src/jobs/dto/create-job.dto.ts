import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDate,
  IsOptional,
} from 'class-validator';
import { JobType, JobVisibility } from '../entities/job.entity';

@InputType()
export class CreateJobDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @Field(() => JobType)
  @IsEnum(JobType, { message: 'Invalid job type' })
  @IsNotEmpty({ message: 'Job type is required' })
  type: JobType;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  location: string;

  @Field(() => JobVisibility)
  @IsEnum(JobVisibility, { message: 'Invalid visibility option' })
  @IsNotEmpty({ message: 'Visibility is required' })
  visibility: JobVisibility;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Salary information is required' })
  salary: string;

  @Field()
  @IsDate()
  @IsNotEmpty({ message: 'Application deadline is required' })
  applicationDeadline: Date;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Organization ID is required' })
  organizationId: string;
}

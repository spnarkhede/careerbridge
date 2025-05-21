import { InputType, Field, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { JobType, JobVisibility } from '../entities/job.entity';
import { CreateJobDto } from './create-job.dto';

@InputType()
export class UpdateJobDto extends PartialType(CreateJobDto) {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => JobType, { nullable: true })
  @IsEnum(JobType, { message: 'Invalid job type' })
  @IsOptional()
  type?: JobType;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  location?: string;

  @Field(() => JobVisibility, { nullable: true })
  @IsEnum(JobVisibility, { message: 'Invalid visibility option' })
  @IsOptional()
  visibility?: JobVisibility;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  salary?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  applicationDeadline?: Date;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Organization } from '../../organizations/entities/organization.entity';

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  TEMPORARY = 'temporary',
}

export enum JobVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  INTERNAL = 'internal',
}

registerEnumType(JobType, {
  name: 'JobType',
});

registerEnumType(JobVisibility, {
  name: 'JobVisibility',
});

@ObjectType()
@Entity('jobs')
export class Job {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  description: string;

  @Field(() => JobType)
  @Column({
    type: 'text',
    default: JobType.FULL_TIME,
  })
  type: JobType;

  @Field()
  @Column()
  location: string;

  @Field(() => JobVisibility)
  @Column({
    type: 'text',
    default: JobVisibility.PUBLIC,
  })
  visibility: JobVisibility;

  @Field()
  @Column()
  salary: string;

  @Field()
  @Column()
  applicationDeadline: Date;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column()
  organizationId: string;

  @Field(() => Organization)
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

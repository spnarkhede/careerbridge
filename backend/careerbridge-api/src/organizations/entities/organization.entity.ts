import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('organizations')
export class Organization {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  industry?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  size?: string;

  @Field()
  @Column()
  location: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactEmail?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  contactPhone?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations will be added here
  // @OneToMany(() => Job, job => job.organization)
  // jobs: Job[];
}

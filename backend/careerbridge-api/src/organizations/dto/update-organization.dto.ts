import { InputType, Field, PartialType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  IsEmail,
} from 'class-validator';
import { CreateOrganizationDto } from './create-organization.dto';

@InputType()
export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  logo?: string;

  @Field({ nullable: true })
  @IsUrl({}, { message: 'Please provide a valid website URL' })
  @IsOptional()
  website?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  industry?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  size?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  location?: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsOptional()
  contactEmail?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @Field({ nullable: true })
  @IsOptional()
  isActive?: boolean;
}

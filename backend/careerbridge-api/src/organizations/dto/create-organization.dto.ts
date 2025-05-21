import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  IsEmail,
} from 'class-validator';

@InputType()
export class CreateOrganizationDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

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

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  location: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsOptional()
  contactEmail?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  contactPhone?: string;
}

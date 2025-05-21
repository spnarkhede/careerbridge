import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OrganizationsService } from '../services/organizations.service';
import { Organization } from '../entities/organization.entity';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

@Resolver(() => Organization)
export class OrganizationsResolver {
  constructor(private organizationsService: OrganizationsService) {}

  @Query(() => [Organization])
  async organizations(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  @Query(() => Organization, { nullable: true })
  async organization(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Organization | null> {
    return this.organizationsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZATION)
  @Mutation(() => Organization)
  async createOrganization(
    @CurrentUser() user: User,
    @Args('createOrganizationInput')
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    // Only admins and organization users can create organizations
    return this.organizationsService.create(createOrganizationDto);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZATION)
  @Mutation(() => Organization, { nullable: true })
  async updateOrganization(
    @CurrentUser() user: User,
    @Args('id', { type: () => ID }) id: string,
    @Args('updateOrganizationInput')
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization | null> {
    // In a real implementation, we would check if the user belongs to this organization
    // For now, we're allowing any organization role to update
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Boolean)
  async deleteOrganization(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    // Only admins can delete organizations
    await this.organizationsService.remove(id);
    return true;
  }
}

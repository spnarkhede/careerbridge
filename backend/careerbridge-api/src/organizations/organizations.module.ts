import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationsService } from './services/organizations.service';
import { OrganizationsResolver } from './resolvers/organizations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationsService, OrganizationsResolver],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}

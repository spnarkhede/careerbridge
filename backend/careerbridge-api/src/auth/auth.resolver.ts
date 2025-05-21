import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(user);
  }

  @Mutation(() => AuthResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
  ): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AuthResponse)
  refreshToken(@CurrentUser() user: User) {
    return this.authService.refreshToken(user);
  }
}

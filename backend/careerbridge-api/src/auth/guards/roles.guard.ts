import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    // For GraphQL context
    if (context.getType().toString() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      const user = req.user;

      return user && requiredRoles.some((role) => user.role === role);
    }

    // For REST context
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && requiredRoles.some((role) => user.role === role);
  }
}

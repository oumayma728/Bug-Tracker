//This code protects routes and checks 2 things:
//Is the user logged in (with a valid JWT)?
//Does the user have the correct role to access this route (Admin, Developer, etc.)?
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';//Reflector: lets us read metadata (like roles from the @Roles() decorator).

@Injectable()
//allows NestJS to inject this class into other parts of your app.
export class AuthGuard extends NestAuthGuard('jwt') implements CanActivate { 
  // NestAuthGuard('jwt') : NestJS’s built-in JWT guard — the one that checks if a JWT token is valid.
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = (await super.canActivate(context)) as boolean;//check if the user has a valid token.
    if (!isAuthenticated) {
      throw new UnauthorizedException('Not authenticated');
    }

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) throw new UnauthorizedException('User not found');

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}

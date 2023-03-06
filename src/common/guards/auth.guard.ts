import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/services';

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const authToken = headers['auth-token'] || headers['AUTH-TOKEN'];

    if (!authToken)
      throw new ForbiddenException('You are forbidden to access this resource');

    const user = await this.authService.verifyToken(authToken);

    if (user) return true;
    throw new UnauthorizedException('You are not authorized');
  }
}

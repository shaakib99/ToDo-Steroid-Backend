import {
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  CanActivate,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class JWTAuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const headers = request.headers;
      const authToken: string =
        headers['x-auth-token'] || headers['X-AUTH-TOKEN'];
      if (!authToken)
        throw new ForbiddenException(
          'You are forbidden to access this resource',
        );

      const user = this.jwtService.verify(authToken.split('Bearer ')[1], {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (!user) throw new UnauthorizedException('You are not authorized');
      request.user = user;
      return user;
    } catch (err) {
      throw new HttpException(
        err?.message || 'Something Went Wrong',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

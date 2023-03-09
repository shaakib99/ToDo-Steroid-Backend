import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, tap } from 'rxjs';

export class TokenInterceptor implements NestInterceptor {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest<Request>();
    const route = request.url;
    const method = request.method;

    return next.handle().pipe(
      tap(async (result) => {
        switch (route) {
          case '/user/login':
            if (method === 'POST') {
              response.header(
                'X-TODO-KEY',
                `Bearer ${this.jwtService.sign(
                  {
                    _id: result?._id,
                    email: result?.email,
                  },
                  {
                    secret: process.env.JWT_SECRET_KEY,
                    expiresIn: '1h',
                  },
                )}`,
              );
            }

            break;

          default:
            break;
        }
      }),
    );
  }
}

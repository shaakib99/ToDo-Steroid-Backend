import {
  CallHandler,
  ExecutionContext,
  Inject,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class AddBearerTokenIntecetor implements NestInterceptor {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap(async (result) => {
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
      }),
      catchError((err) =>
        throwError(() => {
          Logger.error(
            `${req.method} ${req.url} ${Date.now() - now}ms`,
            context.getClass().name,
          );
          return err;
        }),
      ),
    );
  }
}

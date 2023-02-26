import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(
        () =>
          process.env.NODE_ENV !== 'prod' &&
          Logger.log(
            `${req.method} ${req.url} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
      ),
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

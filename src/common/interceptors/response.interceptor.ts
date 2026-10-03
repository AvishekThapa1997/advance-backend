import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResult } from '../types/index.js';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  APIResult<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<APIResult<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          data,
        };
      }),
    );
  }
}

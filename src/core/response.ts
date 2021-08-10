import { ResponseType } from "./types/response";
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerResponse<T> implements NestInterceptor<T, ResponseType> {
     intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType> {
         return next.handle().pipe(map(payload => ({
            error: false,
            message: null,
            payload
         })));
     }
}


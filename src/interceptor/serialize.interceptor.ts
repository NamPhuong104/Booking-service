import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import _ from 'lodash';
import { Observable, of, switchMap } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      switchMap((response) => {
        if (!response) return of(response);

        return of(this.formatResponse(response));
      }),
    );
  }

  formatResponse(response: any) {
    if (response instanceof Object) {
      return {
        status: 200,
        message: 'Sucess',
        data: _.omit(response, 'password'),
      };
    }
  }
}

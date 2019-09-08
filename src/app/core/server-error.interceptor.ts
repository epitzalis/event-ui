// server-errors.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the call fails, retry until 2 times before throwing an error
    return next.handle(request).pipe(retry(2));
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.adminSubject.pipe(
      take(1),
      exhaustMap((admin) => {
        if (!admin) return next.handle(request);
        const newParams = request.params
          ? request.params.append('auth', admin.idToken)
          : undefined;
        const modifiedReq = request.clone({ params: newParams });
        return next.handle(modifiedReq);
      })
    );
  }
}

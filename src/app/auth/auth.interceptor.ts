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
        const authParams = new HttpParams().set('auth', admin.idToken);
        const modifiedReq = request.clone({ params: authParams });
        return next.handle(modifiedReq);
      })
    );
  }
}

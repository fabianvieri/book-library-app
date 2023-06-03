import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.adminSubject.pipe(
    take(1),
    map((admin) => {
      if (admin) return true;
      return router.createUrlTree(['/login']);
    })
  );
};

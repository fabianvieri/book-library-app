import { ResolveFn } from '@angular/router';
import { User } from '../users/user.model';
import { inject } from '@angular/core';
import { UserHttpService } from '../users/user-http.service';

export const userResolver: ResolveFn<User[]> = (route, state) => {
  return inject(UserHttpService).getUsers();
};

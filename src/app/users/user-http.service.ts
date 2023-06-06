import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserData } from './user.model';
import { map, switchMap } from 'rxjs';
import { LoanHttpService } from '../loans/loan-http.service';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  private baseUrl = environment.apiUrl;
  private userUrl = `${this.baseUrl}/user.json`;

  constructor(private http: HttpClient, private loanService: LoanHttpService) {}

  getUsers() {
    return this.http.get<UserData>(this.userUrl).pipe(
      map((users) => {
        console.log(users);

        return Object.keys(users).map((key) => ({
          id: key,
          ...users[key],
        }));
      })
    );
  }

  addUser(user: User) {
    return this.http.post(this.userUrl, user);
  }

  updateUser(user: UserData, userId: string) {
    return this.loanService.getLoanByUserId(userId).pipe(
      switchMap((loans) => {
        const filterLoans = loans.filter((loan) => loan.isReturn === false);
        if (filterLoans.length === 0)
          return this.http.patch(`${this.userUrl}`, user);

        throw new Error('Custom-Error', { cause: 'LOAN_EXISTS' });
      })
    );
  }
}

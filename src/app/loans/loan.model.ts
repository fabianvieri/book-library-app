import { User } from '../users/user.model';

export type Loan = {
  id: string;
  bookId: string;
  user: User;
  fromDate: string;
  toDate: string;
  isReturn: boolean;
};

export type LoanData = {
  [s: string]: Omit<Loan, 'id'>;
};

export enum LoanStatus {
  InProcess = 'In Process',
  Fined = 'Fined',
}

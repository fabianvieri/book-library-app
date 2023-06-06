export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  isDeleted: boolean;
};

export type UserData = {
  [s: string]: Omit<User, 'id'>;
};

export type Admin = {
  id: string;
  email: string;
  idToken: string;
  tokenExpirationDate: Date;
};

export type LoginData = {
  email: string;
  password: string;
  returnSecureToken: true;
};

export type LoginResponse = {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
};

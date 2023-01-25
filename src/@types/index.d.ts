export type User = {
  uid: string,
  email: string,
  role: string,
  password: string,
};

export type AuthorisationOptions = {
  hasRole: string[],
};

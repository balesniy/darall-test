export interface User {
  userId?: number;
  email: string;
}

export interface AuthUser extends User {
  passwordHash: string;
}

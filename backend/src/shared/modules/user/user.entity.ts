import {AuthUser, User} from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import {Entity} from "../../libs/database-client/index.js";

export class UserEntity implements Entity<User>, User {
  public email: string;
  public passwordHash: string;
  userId?: number;

  constructor(userData: User) {
    this.email = userData.email;
  }

  public setPassword(password: string, salt: string) {
    this.passwordHash = createSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.passwordHash;
  }

  public toObject() {
    return {
      email: this.email,
      passwordHash: this.passwordHash,
    }
  }

  public fillEntity(entity: AuthUser) {
    this.email = entity.email;
    this.userId = entity.userId;
    this.passwordHash = entity.passwordHash;
  }
}

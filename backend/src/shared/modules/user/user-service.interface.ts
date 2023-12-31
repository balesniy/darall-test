import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}

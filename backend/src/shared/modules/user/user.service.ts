import { inject, injectable } from 'inversify';
import { Component, User } from '../../types/index.js';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import {UserRepository} from "./user.repository.js";
import {IUserService} from "./user-service.interface.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(Component.UserRepository) private readonly userModel: UserRepository
  ) {}

  async create(dto: CreateUserDto, salt: string): Promise<UserEntity> {
    const userEntity = new UserEntity(dto);
    userEntity.setPassword(dto.password, salt);
    const {userId} = await this.userModel.create(userEntity);
    userEntity.userId = userId;
    return userEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return null;
    }
    const entity = new UserEntity(user);
    entity.fillEntity(user);
    return entity;
  }

  async deleteUse(id: number): Promise<void> {
    await this.userModel.destroy(id);
  }

  async getUser(id: number): Promise<User | null> {
    return this.userModel.findById(id);
  }
}

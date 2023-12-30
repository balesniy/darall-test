import { Container } from 'inversify';
import { IUserService } from './user-service.interface.js';
import { Component } from '../../types/index.js';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { Controller } from '../../libs/rest/index.js';
import {UserRepository} from "./user.repository.js";

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<IUserService>(Component.UserService).to(UserService).inSingletonScope();
  userContainer.bind<UserRepository>(Component.UserRepository).to(UserRepository).inSingletonScope();
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
}

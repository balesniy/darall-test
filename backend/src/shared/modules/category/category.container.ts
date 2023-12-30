import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { ICategoryService } from './category-service.interface.js';
import { CategoryService } from './category.service.js';
import { Controller } from '../../libs/rest/index.js';
import { CategoryController } from './category.controller.js';
import {CategoryRepository} from "./category.repository.js";

export function createCategoryContainer() {
  const categoryContainer = new Container();

  categoryContainer.bind<ICategoryService>(Component.CategoryService).to(CategoryService).inSingletonScope();
  categoryContainer.bind<CategoryRepository>(Component.CategoryRepository).to(CategoryRepository).inSingletonScope();
  categoryContainer.bind<Controller>(Component.CategoryController).to(CategoryController).inSingletonScope();

  return categoryContainer;
}

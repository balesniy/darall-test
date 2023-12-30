import { CreateCategoryDto } from './dto/create-category.dto.js';
import { CategoryEntity } from './category.entity.js';
export interface ICategoryService {
  createCategory(dto: CreateCategoryDto): Promise<CategoryEntity>;
  findByCategoryId(categoryId: string | number ): Promise<CategoryEntity | null>;
  findByCategoryName(categoryName: string): Promise<CategoryEntity | null>;
  findByCategoryNameOrCreate(categoryName: string, dto: CreateCategoryDto): Promise<CategoryEntity>;
  find(): Promise<CategoryEntity[]>;
}

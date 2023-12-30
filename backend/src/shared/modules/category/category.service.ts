import {inject, injectable} from 'inversify';
import {Component, Category} from '../../types/index.js';
import {CategoryEntity} from './category.entity.js';
import {CreateCategoryDto, UpdateCategoryDto} from './dto/create-category.dto.js';
import {CategoryRepository} from "./category.repository.js";
import {ICategoryService} from "./category-service.interface.js";

@injectable()
export class CategoryService implements ICategoryService {
    constructor(
        @inject(Component.CategoryRepository) private readonly categoryModel: CategoryRepository
    ) {
    }

    async findByCategoryId(categoryId: number): Promise<CategoryEntity | null> {
        const category = await this.categoryModel.findById(categoryId);
        return category ? new CategoryEntity(category) : null;
    }

    async findByCategoryNameOrCreate(categoryName: string, dto: CreateCategoryDto): Promise<CategoryEntity> {
        const category = await this.categoryModel.findByCategoryName(categoryName)
        if (category) {
            return new CategoryEntity(category);
        } else {
            const categoryEntity = new CategoryEntity(dto);
            await this.categoryModel.create(categoryEntity);
            return categoryEntity;
        }
    }

    async find(): Promise<CategoryEntity[]> {
        const categories = await this.getCategories();
        return categories.map(category => new CategoryEntity(category));
    }

    async createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> {
        const categoryEntity = new CategoryEntity(dto);
        await this.categoryModel.create(categoryEntity);
        return categoryEntity;
    }

    async delete(id: number): Promise<void> {
        await this.categoryModel.destroy(id);
    }

    async findById(id: number): Promise<Category | null> {
        return this.categoryModel.findById(id);
    }

    async findByCategoryName(categoryName: string): Promise<CategoryEntity | null> {
        const category = await this.categoryModel.findByCategoryName(categoryName);
        return category ? new CategoryEntity(category) : null;
    }


    async getCategories(): Promise<Category[]> {
        return this.categoryModel.find(undefined);
    }

    async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
        return this.categoryModel.update(id, new CategoryEntity(dto));
    }
}

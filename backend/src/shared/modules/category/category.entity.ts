import { Entity } from '../../libs/database-client/index.js';
import { Category } from '../../types/index.js';

export class CategoryEntity implements Entity<CategoryEntity>, Category {
  public categoryId?: number;
  public offerCount?: number;
  public name: string;
  public description: string;

  constructor(category: Category) {
    this.fillEntity(category);
  }

  public fillEntity(entity: Category) {
    this.name = entity.name;
    this.description = entity.description ?? '';
    this.categoryId = entity.categoryId;
    this.offerCount = entity.offerCount;
  }

  public toObject(): CategoryEntity {
    return { ...this }
  }

  public populate(data: CategoryEntity): void {
    this.categoryId = data.categoryId;
    this.name = data.name;
    this.description = data.description ?? '';
  }

  public toPOJO(): Record<string, unknown> {
    return {
      id: this.categoryId,
      title: this.name,
      description: this.description
    }
  }
}

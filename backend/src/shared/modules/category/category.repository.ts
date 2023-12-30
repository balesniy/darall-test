import { CategoryEntity } from './category.entity.js';
import { PrismaService, CRUDRepository } from '../../libs/database-client/index.js';
import {inject, injectable} from "inversify";
import {Category, Component} from '../../types/index.js';
@injectable()
export class CategoryRepository implements CRUDRepository<CategoryEntity, number, Category> {
    constructor(@inject(Component.DatabaseClient) private readonly prisma: PrismaService) {}

    public async create(item: CategoryEntity): Promise<Category> {
        return this.prisma.category.create({
            data: { ...item.toObject() }
        });
    }

    public async destroy(categoryId: number): Promise<void> {
        await this.prisma.category.delete({
            where: {
                categoryId,
            }
        });
    }

    public findById(categoryId: number): Promise<Category | null> {
        return this.prisma.category.findFirst({
            where: {
                categoryId
            }
        });
    }

    public async find(ids: number[] | undefined): Promise<Category[]> {
        const categories = await this.prisma.category.findMany({
            where: {
                categoryId: {
                    in: ids
                }
            },
            include: {
                _count: {
                    select: {offers: true}
                }
            }
        });
        return categories.map(category => ({
            ...category,
            offerCount: category._count?.offers ?? 0
        }));
    }

    public update(categoryId: number, item: CategoryEntity): Promise<Category> {
        return this.prisma.category.update({
            where: {
                categoryId
            },
            data: { ...item.toObject(), categoryId}
        });
    }

    public findByCategoryName(categoryName: string): Promise<Category | null> {
        return this.prisma.category.findFirst({
            where: {
                name: categoryName
            }
        })
    }
}

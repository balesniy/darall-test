import { UserEntity } from './user.entity.js';
import { PrismaService, CRUDRepository } from '../../libs/database-client/index.js';
import {inject, injectable} from "inversify";
import {AuthUser, Component, User} from '../../types/index.js';
@injectable()
export class UserRepository implements CRUDRepository<UserEntity, number, User> {
    constructor(@inject(Component.DatabaseClient) private readonly prisma: PrismaService) {}

    public async create(item: Omit<UserEntity, 'userId'>): Promise<User> {
        return this.prisma.user.create({
            data: { ...item.toObject() }
        });
    }

    public async destroy(userId: number): Promise<void> {
        await this.prisma.user.delete({
            where: {
                userId,
            }
        });
    }

    public async update(userId: number, item: UserEntity): Promise<User> {
        return this.prisma.user.update({
            where: {
                userId
            },
            data: { ...item.toObject() }
        });
    }

    public findById(userId: number): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                userId
            }
        });
    }

    public async findByEmail(email: string): Promise<AuthUser | null> {
        return this.prisma.user.findFirst({
            where: {
                email
            }
        });
    }
}

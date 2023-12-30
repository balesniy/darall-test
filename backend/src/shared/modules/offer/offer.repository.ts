import {OfferEntity} from './offer.entity.js';
import {CRUDRepository, PrismaService} from '../../libs/database-client/index.js';
import {inject, injectable} from "inversify";
import {Component, Offer} from '../../types/index.js';

@injectable()
export class OfferRepository implements CRUDRepository<OfferEntity, number, Offer> {
    constructor(@inject(Component.DatabaseClient) private readonly prisma: PrismaService) {
    }

    public async create(entityData: Offer): Promise<OfferEntity> {
        const offer = await this.prisma.offer.create({
            data: {
                ...entityData,
                categories: {
                    connect: entityData.categories
                        .map(({categoryId}) => ({categoryId}))
                }
            },
            include: {
                categories: true,
            }
        });
        return new OfferEntity(offer);
    }

    public async destroy(offerId: number): Promise<void> {
        await this.prisma.offer.delete({
            where: {
                offerId,
            }
        });
    }

    public findById(offerId: number): Promise<Offer | null> {
        return this.prisma.offer.findFirst({
            where: {
                offerId
            }
        }) as Promise<Offer | null>;
    }

    public async findByCategoryId(categoryId: number, count?: number): Promise<Offer[]> {
        const offers = await this.prisma.offer.findMany({
            where: {
                categories: {
                    some: {
                        categoryId
                    }
                }
            },
            include: {
                categories: true
            },
            take: count
        });
        return offers.map(offer => new OfferEntity(offer));
    }

    public async find(ids: number[] = []): Promise<OfferEntity[]> {
        const offers = await this.prisma.offer.findMany({
            where: {
                offerId: {
                    in: ids.length > 0 ? ids : undefined
                }
            },
            include: {
                categories: true
            }
        });

        return offers.map(offer => new OfferEntity(offer));
    }

    public async update(offerId: number, item: Partial<Offer>): Promise<OfferEntity> {
        const data = {
            ...item,
            categories: {
                set: item.categories
                    ?.map(({categoryId}) => ({categoryId}))
            }
        }
        const offer = await this.prisma.offer.update({
            where: {
                offerId
            },
            include: {
                categories: true
            },
            data,
        });
        return new OfferEntity(offer);
    }
}

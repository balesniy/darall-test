import { inject, injectable} from 'inversify';
import {IOfferService} from './offer-service.interface.js';
import {Component, Offer} from '../../types/index.js';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {CategoryRepository} from "../category/category.repository.js";
import {OfferRepository} from "./offer.repository.js";


@injectable()
export class OfferService implements IOfferService {
    constructor(
        @inject(Component.OfferRepository) private readonly offerModel: OfferRepository,
        @inject(Component.CategoryRepository) private readonly categoryModel: CategoryRepository
    ) {}

    async create(dto: CreateOfferDto): Promise<OfferEntity> {
        const categories = await this.categoryModel.find(dto.categories);
        // todo check if categories exists
        return this.offerModel.create({ ...dto, categories });
    }

    async deleteById(id: number): Promise<void> {
        await this.offerModel.destroy(id);
    }

    async findById(id: number): Promise<Offer | null> {
        return this.offerModel.findById(id);
    }

    async find(): Promise<Offer[]> {
        return this.offerModel.find();
    }

    async findByCategoryId(categoryId: number, count?: number): Promise<Offer[]> {
        return this.offerModel.findByCategoryId(categoryId, count);
    }

    async updateById(offerId: number, dto: UpdateOfferDto): Promise<Offer | null> {
        const categories = await this.categoryModel.find(dto.categories || []);
        return this.offerModel.update(offerId, { ...dto, categories });
    }
}

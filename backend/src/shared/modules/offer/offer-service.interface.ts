import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Offer } from '../../types/index.js';

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<Offer>;
  findById(offerId: number): Promise<Offer | null>;
  find(): Promise<Offer[]>;
  deleteById(offerId: number): Promise<void>;
  updateById(offerId: number, dto: UpdateOfferDto): Promise<Offer | null>;
  findByCategoryId(categoryId: number | string, count?: number): Promise<Offer[]>;
}


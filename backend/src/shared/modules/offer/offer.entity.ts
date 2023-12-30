import { Entity } from '../../libs/database-client/index.js';
import { Offer } from '../../types/index.js';
import { CategoryEntity } from '../category/index.js';

type OfferWithId = Offer & { offerId: number };
export class OfferEntity implements Entity<OfferEntity>, Offer {
  public offerId: number;
  public title: string;
  public description: string;
  public image: string;
  public price: number;
  public categories: CategoryEntity[];
  public createdAt: Date;
  public publishAt: Date;


  constructor(offer: OfferWithId) {
    this.fillEntity(offer);
  }

  public fillEntity(entity: OfferWithId) {
    this.title = entity.title;
    this.offerId = entity.offerId;
    this.price = entity.price;
    this.image = entity.image || '';
    this.description = entity.description;
    this.categories = [...entity.categories].map(i => new CategoryEntity(i));
    this.createdAt = new Date();
  }

  public toObject(): OfferEntity {
    return { ...this, categories: [...this.categories], }
  }
}

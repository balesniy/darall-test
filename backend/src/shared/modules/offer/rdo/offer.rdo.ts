import { Expose, Type } from 'class-transformer';
import { CategoryRdo } from '../../category/index.js';

export class OfferRdo {
  @Expose()
  public offerId: number;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public image: string;

  @Expose()
  public price: number;

  @Expose()
  @Type(() => CategoryRdo)
  public categories: CategoryRdo[];
}

import { Category } from './index.js';

export type Offer = {
  offerId?: number;
  title: string;
  description: string;
  createdAt?: Date;
  publishAt?: Date;
  price: number;
  categories: Category[];
  image?: string;
}

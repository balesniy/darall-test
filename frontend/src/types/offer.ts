import type {Categories} from './category';

export type OfferWithoutCategory = {
    offerId?: number,
    title: string,
    description: string,
    image: string,
    price: number,
}

export type Offer = OfferWithoutCategory & {
    categories: Categories,
}
export type OfferEdit = OfferWithoutCategory & {
    categories: string[],
    imageStatus?: boolean
};

export type OfferCreate = Omit<OfferEdit, 'offerId'>;


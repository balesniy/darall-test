import {HttpClient} from './HttpClient'
import {getToken} from './token-manager'
import httpProvider from '@/services/providers'
import type {Offer} from "@/types/offer";
import type CreateOfferDto from "@/dto/offer/create-offer.dto";
import type UpdateOfferDto from "@/dto/offer/update-offer.dto";

const BASE_URL = '/api/offers'

class OffersService extends HttpClient {
    createRequest(offer: Offer | UpdateOfferDto) {
        // Убираем ненужные параметры
        const {...request} = offer
        return request
    }

    normalizeOffer(offer: Offer) {
        return {
            ...offer,
        }
    }

    async fetchOffers() {
        try {
            const offers: Offer[] = await this.get('/')
            return offers.map(offer => this.normalizeOffer(offer))
        } catch (e) {
            throw (e)
        }
    }

    async createOffer(offer: CreateOfferDto, image: FormData) {
        try {
            const newOffer = await this.post('/', {data: offer})
            if (newOffer.offerId) {
                await this.post(`/${newOffer.offerId}/image`, {data: image})
            }
            return this.normalizeOffer(newOffer)
        } catch (e) {
            throw (e)
        }
    }

    async updateOffer(offer: UpdateOfferDto | Offer) {
        try {
            const updatedOffer: Offer = await this.put(`/${offer.offerId}`, {data: this.createRequest(offer)})
            return this.normalizeOffer(updatedOffer)
        } catch (e) {
            throw (e)
        }
    }

    async deleteOffer(id: number) {
        try {
            await this.delete(`/${id}`)
        } catch (e) {
            throw (e)
        }
    }
}

export default new OffersService({
    httpProvider,
    baseURL: BASE_URL,
    getToken,
})

import {defineStore} from 'pinia'
import {useFiltersStore, useCategoriesStore} from '@/stores'
import type {Offer} from '@/types/offer'
import {offersService} from "@/services";
import CreateOfferDto from "@/dto/offer/create-offer.dto";
import type {Category} from "@/types/category";

export const useOffersStore = defineStore('offers', {
    state: (): { offers: Offer[] } => ({
        offers: [],
    }),
    getters: {
        filteredOffers: state => {
            const filtersStore = useFiltersStore()

            const filtersAreEmpty = Object.values(filtersStore.filters)
                .every(value => !value.length)

            if (filtersAreEmpty) {
                // Вернуть все задачи если фильтры не применены
                return state.offers
            }

            const searchFilter = (offer: Offer) => offer.title
                .toLowerCase()
                .includes(filtersStore.filters.search.toLowerCase().trim())

            const categoriesFilter = (offer: Offer) => filtersStore.filters.categories
                .some(id => offer.categories.some(category => category.id === id))

            // Обработать задачи в соответствии с фильтрами
            return state.offers.filter(offer =>
                (!filtersStore.filters.search.length || searchFilter(offer)) &&
                (!filtersStore.filters.categories.length || categoriesFilter(offer))
            );
        },
        getOfferById: state => (id: number) => {
            return state.offers.find(offer => offer.offerId === id)
        },
        getOfferCategoryById: () => (id: number) => {
            const categoriesStore = useCategoriesStore()
            return categoriesStore.categories.find(category => category.id === id)
        },
    },
    actions: {
        async fetchOffers() {
            // Получение данных из json файла будет заменено в последующих разделах
            this.offers = await offersService.fetchOffers()
        },
        updateOffers(offersToUpdate: Offer[]) {
            offersToUpdate.forEach(async offer => {
                const index = this.offers.findIndex(({offerId}) => offerId === offer.offerId)
                // findIndex вернет элемент массива или -1
                // Используем bitwise not для определения если index === -1
                // ~-1 вернет 0, а значит false
                if (~index) {
                    // Обновить порядок сортировки на сервере
                    await offersService.updateOffer(offer)
                    this.offers.splice(index, 1, offer)
                }
            })
        },
        async addOffer(data: CreateOfferDto, image: FormData) {
            const newOffer = await offersService.createOffer(data, image)
            // Добавляем задачу в массив
            this.offers = [...this.offers, newOffer]
            return newOffer
        },
        async editOffer(offer: Offer) {
            const newOffer = await offersService.updateOffer({
                ...offer,
                categories: offer.categories.map(({id}: Category) => id),
            })
            const index = this.offers.findIndex(({offerId}) => newOffer.offerId === offerId)
            if (~index) {
                this.offers.splice(index, 1, newOffer)
            }
            return newOffer
        },
        async deleteOffer(id: number) {
            await offersService.deleteOffer(id)
            this.offers = this.offers.filter(offer => offer.offerId !== id)
        }
    },
})

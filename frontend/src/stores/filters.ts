import { defineStore } from 'pinia'

export type FilterType = {
    search: string
    categories: number[]
}
export const useFiltersStore = defineStore('filters', {
    state: (): FilterType => ({
        search: '',
        categories: [],
    }),
    getters: {
        filters: state => {
            const { search, categories } = state
            return {
                search,
                categories,
            }
        }
    },
    actions: {
        applyFilters({ item, filterType }: { item: number | string; filterType: keyof FilterType }) {
            if (filterType === 'search' && typeof item === 'string') {
                this.search = item;
            } else {
                const updatedValues = [...this[filterType]];
                const index = updatedValues.indexOf(item);
                if (index !== -1) {
                    updatedValues.splice(index, 1);
                } else {
                    updatedValues.push(item);
                }
                this.$patch({ [filterType]: updatedValues });
            }
        }
    },
})

import { defineStore } from "pinia";
import { categoryService } from '@/services'
import type {Category} from "@/types/category";
import CategoryDto from "@/dto/category/category.dto";

export const useCategoriesStore = defineStore('categories', {
    state: (): { categories: Category[] } => ({
        categories: [],
    }),
    getters: {},
    actions: {
        async fetchCategories() {
            const categories: CategoryDto[] = await categoryService.fetchCategories()
            this.categories = categories.map(item => ({
                ...item,
                itemsCount: item.offerCount,
                title: item.name
            }))
        },
    },
});

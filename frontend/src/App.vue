<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup lang="ts">
import { AppLayout } from './layouts'
import { useOffersStore, useCategoriesStore } from './stores'

// Определяем хранилища
const offersStore = useOffersStore()
const categoriesStore = useCategoriesStore()

// Загрузка первоначальных данных
// Загружаем задачи
void offersStore.fetchOffers()
// Загружаем пользователей
void categoriesStore.fetchCategories()
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>

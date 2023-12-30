<template>
  <main class="content">
    <section class="desk">
      <!--      Отображение дочерних маршрутов-->
      <router-view/>
      <!--      Шапка-->
      <div class="desk__header">
        <h1 class="desk__title">
          Coffee Lab
        </h1>
        <router-link to="/offers/create">create</router-link>
        <router-link v-if="!authStore.user" to="/login">login</router-link>
        <a v-else href="#" @click.prevent="logout">logout</a>
      </div>
      <div>
        <template v-for="category in categoriesStore.categories">
          <input v-model="filtersStore.categories" name="categories" type="checkbox" :value="category.id"/> {{ category.title }}
        </template>
      </div>
      <ul>
        <li v-for="offer in offersStore.filteredOffers">
          <router-link :to="`/offers/edit/${offer.offerId}`">{{ offer.title }} - {{ offer.price }}</router-link>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useFiltersStore, useOffersStore, useAuthStore, useCategoriesStore } from '@/stores'
import {Field} from "vee-validate";
import {ref} from "vue";

// Определяем хранилища
const filtersStore = useFiltersStore()
const offersStore = useOffersStore()
const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()

const logout = () => {
  authStore.logout()
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.desk {
  $bl: ".desk";

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  width: calc(100% - 400px);
  padding-top: 27px;

  background-color: $white-900;

  &__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    margin-bottom: 24px;
    padding: 0 17px;
  }

  &__title {
    @include m-s24-h21;

    margin: 0;
    margin-right: auto;

    color: $black-900;
  }

  &__add {
    position: relative;

    margin: 0;
    padding: 0 0 0 35px;

    cursor: pointer;

    color: $blue-gray-600;
    border: none;
    outline: none;
    background-color: transparent;

    &::before {
      width: 24px;
      height: 24px;

      content: "";

      background-image: url("@/assets/img/icon-add.svg");

      @include p_center-v;
    }

    &:hover {
      color: $blue-600;
    }

    &:active {
      color: $blue-300;
    }
  }

  &__filters {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin-top: 16px;
  }

  &__user-filter {
    margin-right: 40px;
  }

  &__columns {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    flex-grow: 1;

    border-top: 1px solid $blue-gray-200;
  }
}

.user-filter {
  @include clear-list;

  display: flex;
  flex-direction: row-reverse;

  &__item {
    margin-right: -4px;
  }

  &__button {
    display: block;
    overflow: hidden;

    width: 24px;
    height: 24px;

    cursor: pointer;
    transition: 0.3s;

    border: 1px solid $white-900;
    border-radius: 50%;
    outline: none;
    background-color: $blue-gray-50;

    &:hover {
      border-color: $blue-600;
    }

    img {
      display: block;

      width: 24px;
      height: 24px;
    }

    span {
      @include m-s14-h21;

      display: block;

      width: 100%;
      height: 100%;
      padding-top: 1px;

      text-align: center;

      color: $white-900;
      background-color: $green-700;
    }

    &--current {
      border-color: $white-900;
      box-shadow: 0 0 0 1px $blue-600;
    }
  }
}

.meta-filter {
  @include clear-list;

  display: flex;
  align-items: center;

  &__item {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }

  &__status {
    display: block;

    box-sizing: content-box;
    margin: 0;
    padding: 0;

    cursor: pointer;
    transition: 0.3s;

    border: 1px solid $white-900;
    border-radius: 50%;
    outline: none;
    background-color: transparent;

    &:hover {
      border-color: $blue-600;
    }

    &--color {
      width: 8px;
      height: 8px;
    }

    &--green {
      background-color: $green-600;
    }

    &--orange {
      background-color: $orange-600;
    }

    &--red {
      background-color: $red-600;
    }

    &--time {
      width: 16px;
      height: 16px;

      background-image: url("@/assets/img/status-time.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--alert {
      width: 16px;
      height: 16px;

      background-image: url("@/assets/img/status-alert.svg");
      background-repeat: no-repeat;
      background-size: cover;
    }

    &--current {
      border-color: $white-900;
      box-shadow: 0 0 0 1px $blue-600;
    }
  }
}

.active {
  border: 1px solid $blue-600;
  border-radius: 50%;
  outline: none;
  background-color: transparent;
}
</style>

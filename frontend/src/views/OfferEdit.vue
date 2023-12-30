<template>
  <h2>Offer edit</h2>
  <Form v-if="offer" ref="form" @submit="updateOffer">
    <Field v-model="offer.title" name="title" type="text" rules="required|min:3" placeholder="title"/>
    <Field v-model="offer.description" name="description" type="text" rules="required|min:3" placeholder="description"/>
    <Field v-model="offer.price" name="price" type="number" rules="required" placeholder="price"/>
    <img v-if="offer.image" :src="offer.image" alt=""/>
    <template v-for="category in categoriesStore.categories">
      <Field v-model="offer.categories" name="categories" type="checkbox" :rules="validateCategory" :value="category"/>
      {{ category.title }}
    </template>
    <ErrorMessage name="category"/>
    <button type="submit">Update</button>
  </Form>
</template>
<script setup lang="ts">
import {useRoute} from "vue-router";
import {useCategoriesStore, useOffersStore} from "@/stores";
import {computed} from "vue";
import {defineRule, ErrorMessage, Field, Form} from "vee-validate";
import {required, min} from "@vee-validate/rules";

defineRule('required', required);
defineRule('min', min);

const offersStore = useOffersStore()
const categoriesStore = useCategoriesStore()

const validateCategory = (value: number[]) => {
  if (value && value.length) {
    return true
  }
  return 'You must choose at least one category'
}

const route = useRoute();

const offer = computed(() => offersStore.getOfferById(Number(route.params.id)))

const updateOffer = (data) => {
  offersStore.editOffer({
    ...data,
    offerId: Number(route.params.id)
  })
}
</script>

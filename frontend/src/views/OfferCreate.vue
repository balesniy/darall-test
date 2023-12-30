<template>
  <Form ref="form" @submit="createOffer">
    <Field name="title" type="text" rules="required|min:3" placeholder="title" />
    <Field name="description" type="text" rules="required|min:3" placeholder="description" />
    <Field name="price" type="number" rules="required" placeholder="price" />
    <Field name="image" rules="required|image" type="file" />
    <ErrorMessage name="image" />
    <template v-for="category in categoriesStore.categories">
      <Field name="categories" type="checkbox" :rules="validateCategory" :value="category.id"/> {{ category.title }}
    </template>
    <ErrorMessage name="category" />
    <button type="submit">Create</button>
  </Form>
</template>

<script setup lang="ts">
import {Form, Field, ErrorMessage, defineRule, type SubmissionHandler} from 'vee-validate'
import {useCategoriesStore, useOffersStore} from "@/stores";
import { required, min, image } from "@vee-validate/rules";
import CreateOfferDto from "@/dto/offer/create-offer.dto";
import {ref} from "vue";

defineRule('required', required);
defineRule('min', min);
defineRule('image', image);

const form = ref()

const isLoading = ref(false) // TODO: add loader

const validateCategory = (value: number[]) => {
  if (value && value.length) {
    return true;
  }

  return 'You must choose at least one category';
}

const categoriesStore = useCategoriesStore()
const offersStore = useOffersStore()
const createOffer: SubmissionHandler = (data: CreateOfferDto & { image: File }) => {
  const {image, ...offer} = data
  const formData = new FormData();
  formData.append('image', data.image);
  isLoading.value = true
  offersStore.addOffer(offer, formData)
  isLoading.value = false
  form.value.resetForm()
}
</script>

<style lang="scss" scoped>
</style>

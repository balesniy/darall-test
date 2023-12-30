<template>
  <div class="sign-form sign-in">
    <!--    Шапка формы входа-->
    <div class="sign-form__header">
      <router-link
          to="/"
          class="logo"
      >
        <img
            src="@/assets/img/logo.svg"
            alt="logo"
            width="147"
            height="23"
        />
      </router-link>

      <button
          class="sign-form__close"
          type="button"
          @click="router.push('/')"
      />
    </div>

    <h3 class="sign-form__title">
      Войти
    </h3>
    <!--    Форма входа-->
    <Form
        class="sign-form__shape"
        @submit="login"
    >
      <!--      Поле электронной почты-->
      <label class="sign-form__input">
        <Field
            v-model="email"
            type="email"
            name="email"
            class="input"
            placeholder="E-mail"
            rules="required|email"
        />
        <ErrorMessage name="email" />
      </label>
      <!--      Поле пароля-->
      <label class="sign-form__input">
        <Field
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="Пароль"
            rules="required|min:6"
        />
        <ErrorMessage name="password" />
      </label>
      <!--      Кнопка отправки формы-->
      <div class="sign-form__wrap">
        <button
            class="button--primary"
            type="submit"
        >
          Войти
        </button>
      </div>
      <!--       Поле ошибок сервера-->
      <div v-if="serverErrorMessage" class="server-error-message">{{ serverErrorMessage }}</div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineRule } from 'vee-validate';
import { required, email as emailRule, min } from '@vee-validate/rules';
defineRule('required', required);
defineRule('email', emailRule);
defineRule('min', min);

const router = useRouter()
const authStore = useAuthStore()


const email = ref('')
const password = ref('')
const serverErrorMessage = ref(null)

watch([email, password], () => {
  // Очищаем поля ошибок при вводе новых данных
  if (serverErrorMessage.value) serverErrorMessage.value = null
})

async function login() {
  const responseMessage = await authStore.login(email.value, password.value)
  // Проверяем если возвращается статус не "ок", то показываем ошибку сервера
  if (!responseMessage.token) {
    serverErrorMessage.value = responseMessage
  } else {
    // Получаем данные пользователя
    await authStore.getMe()
    // Если логин прошел без ошибок, перенаправляем на главную страницу
    await router.push('/')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.sign-form {
  display: block;

  width: 500px;

  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  @include pf_center-all;

  &__shape {
    padding-right: 64px;
    padding-bottom: 64px;
    padding-left: 64px;
  }

  &__header {
    display: flex;
    justify-content: space-between;

    padding: 25px;

    background-color: $blue-600;
  }

  &__title {
    margin: 30px 0;

    text-align: center;

    color: $blue-gray-600;

    @include m-s24-h21;
  }

  &__input {
    display: block;

    margin-bottom: 16px;
  }

  &__checkbox {
    margin-top: 20px;
  }

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 30px;
  }

  &__link {
    color: $blue-600;

    &:hover {
      text-decoration: underline;
    }
  }

  &__close {
    position: relative;

    width: 20px;
    height: 20px;

    cursor: pointer;

    border: none;
    background-color: transparent;

    &::after,
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 100%;
      height: 1px;

      content: "";

      background-color: $white-900;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:hover {
      &::before,
      &::after {
        opacity: 0.6;
      }
    }
  }
}

.server-error-message {
  margin-top: 20px;
  color: $red-700;
}
</style>

<template>
  <header class="header">header</header>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

function logout () {
  authStore.logout()
}
</script>

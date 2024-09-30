<template>
  <LoadingComponent v-if="isLoading"/>
  <NuxtPage />
  <UNotifications />
</template>

<script setup>
import { ref } from 'vue'

let isLoading = ref(true)

onMounted(() => {isLoading.value = false})

</script>


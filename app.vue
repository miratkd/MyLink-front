<template>
  <LoadingComponent v-if="isLoading"/>
  <NuxtPage />
</template>

<script setup>

let isLoading = ref(true)

onMounted(() => {isLoading.value = false})

</script>


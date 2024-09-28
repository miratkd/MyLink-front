<template>
  <LoadingComponent v-if="isLoading"/>
  <NuxtPage />
</template>

<script>
export default{
  data() {
    return {
      isLoading: true
    }
  },
  mounted () {
    this.isLoading = false;
  },
}
</script>


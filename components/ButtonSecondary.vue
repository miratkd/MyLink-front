<template>
    <button class="color-purple border px-5 py-1 rounded" :class="font">
        {{ text }}
    </button>
</template>

<script setup>
const props = defineProps({
  text: String,
  font: {
    type: String,
    default: 'body-m'
  }
})
</script>

<style lang="sass" scoped>
button
    border-color: var(--purple)
    &:disabled
        color: var(--ligth-purple)
        border-color: var(--ligth-purple)
    &:active
        background-color: var(--ligth-purple)
</style>
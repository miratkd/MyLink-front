<template>
    <button class="color-purple border rounded w-full heading-s">
        {{ text }}
    </button>
</template>

<script setup>
const props = defineProps({
  text: String
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
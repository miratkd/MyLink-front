<template>
    <button  class="px-5 py-1 body-m rounded-md">
        {{ text }}
    </button>
</template>

<script>
    export default {
        name: 'ButtonComponent',
        props: {
            text: {
                type: String,
                default: 'aqui'
            },
        },
    }
</script>

<style lang="sass" scoped>
button
    background-color: var(--purple)
    color: white
    &:disabled
        background-color: var(--ligth-purple)
    &:active
        background-color: var(--purple-hover)
</style>
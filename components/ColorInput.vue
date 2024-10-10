<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" type="color" class="w-18 h-10 rounded"></input>
</template>

<script setup>
const props = defineProps({
    modelValue: String
})
const emit = defineEmits()
</script>

<style lang="sass" scoped>

</style>
<template>
    <input :value="modelValue" @input="handleChange" type="color" class="w-18 h-10 rounded"></input>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: String
})
function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value)
}
const emit = defineEmits()
</script>

<style lang="sass" scoped>

</style>
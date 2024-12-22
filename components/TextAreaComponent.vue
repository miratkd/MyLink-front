<template>
    <div class="relative flex items-center">
        <textarea :class="{ 'border-red-500': alert }" :placeholder="placeholder"
            class="border px-2 py-1 rounded mt-2  input-container  w-full h-20 body-m color-gray component-input"
            :value="modelValue" @input="$emit('update:modelValue', handleChange)">
        </textarea>
        <span data-test="input-alert" class="absolute right-3 text-red-400 body-s">{{ alert }}</span>
    </div>
</template>

<script setup lang="ts">
let props = defineProps({
    placeholder: {
        type: String,
        default: 'Insira um valor'
    },
    modelValue: {
        type: String,
        required: true
    },
    alert: {
        type: String,
        default: ''
    },
})
function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value)
}
const emit = defineEmits()

</script>

<style lang="sass" scoped>
.text-red-500
    color: var(--red)
.input-container
    &:focus
        outline: 1px solid var(--purple)
</style>
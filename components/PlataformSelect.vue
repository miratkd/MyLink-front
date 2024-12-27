<template>
    <div :class="{ 'border-red-500': alert }" class="border relative bg-white px-3 py-1 rounded mt-2 flex input-container">
        <img v-if="modelValue" :src="modelValue.imgUrl" :alt="modelValue.name" class="w-5">
        <select class="w-full select-outline" :value="modelValue ? modelValue.id : 0" @input="handleChange">
            <option v-for="op in options" :key="op.id" :value="op.id">{{ op.name }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import type { Plataform } from '~/interfaces';

const props = defineProps({
    alert: {type: String},
    options: {type: Array<Plataform>, required: true},
    modelValue: {type: Object as () => Plataform}
})
const emit = defineEmits()

function handleChange(event: Event) {
  const input = event.target as HTMLSelectElement;
  emit('update:modelValue', props.options.find(op => op.id == Number(input.value)))
}
</script>

<style lang="sass" scoped>
.select-outline
    &:focus
        outline: none
</style>
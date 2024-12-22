<template>
    <div :data-test="'card-component-'+card.id" class="bg-gray-100 p-3 mt-10 rounded cursor-pointer">
        <div class="flex justify-between items-center">
            <img :src="card.imageUrl" class="w-5" :alt="card.title">
            <span :data-test="'card-component-title-'+card.id" class="body-m font-bold color-gray truncate max-w-1/2">{{ card.title }}</span>
            <span :data-test="'card-component-delete-'+card.id" @click.stop="deleteCard(card.id)" class="body-m color-gray cursor-pointer">Remover</span>
        </div>
        <p class="body-s color-gray mt-3 truncate lg:whitespace-normal">{{ card.description }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Card } from '~/interfaces';
let props = defineProps({
    card: {
        type: Object as () => Card,
        required: true
    },
    deleteCard: Function
})
</script>

<style lang="sass" scoped>

</style>
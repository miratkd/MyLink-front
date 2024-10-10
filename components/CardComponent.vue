<template>
    <div class="bg-gray-100 p-3 mt-10 rounded">
        <div class="flex justify-between items-center">
            <img :src="card.imageUrl" class="w-5" :alt="card.description">
            <span class="body-m font-bold color-gray truncate max-w-1/2">{{ card.title }}</span>
            <span @click.stop="deleteCard(card.id)" class="body-m color-gray">Remover</span>
        </div>
        <p class="body-s color-gray mt-3 truncate">{{ card.description }}</p>
    </div>
</template>

<script setup>
let props = defineProps({
    card: Object,
    deleteCard: Function
})
</script>

<style lang="sass" scoped>

</style>
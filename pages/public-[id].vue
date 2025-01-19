<template>
    <div class="flex flex-col items-center">
        <div v-if="card" class="hidden md:block h-44 w-full" :style="'background-color: '+ card.mainColor"></div>
        <div v-if="card" class="flex flex-col items-center md:bg-white md:absolute md:top-32 md:w-3/5 md:rounded lg:w-2/5">
            <img class=" mt-20 md:mt-5 w-24 rounded-full border-4" :style="borderColor(card)" :src="card.imageUrl" alt="">
            <p data-test="card-title" class="color-dark-gray heading-s font-bold"> {{ card.title }}</p>
            <p data-test="card-email" class="color-gray heading-s"> {{ card?.displayEmail }}</p>
            <p data-test="card-description" class="body-s w-5/6 text-center color-gray mb-6">{{ card?.description }}</p>
            <a v-for="(link,idx) in card.links" :href="link.link" target="_blank" :key="idx"  :style="'background-color: ' + link.color"
                class="flex text-white items-center gap-2 px-3 py-1 rounded cursor-pointer w-1/2 mb-4">
                <img :src="link.icon" class="w-7 h-7" alt="">
                {{ link.plataformName }}
                <img src="@/assets/icon-arrow-right.svg" class="ml-auto" alt="">
            </a>

            <LoadingComponent v-if="isLoading" />
        </div>
    </div>

</template>

<script setup lang="ts">
import type { Card } from '~/interfaces';
import RequestService from '~/services/RequestService';

const card = ref<Card | undefined>()
const service = new RequestService()
const isLoading = ref(true)
const route = useRoute()

onMounted(() => {
    service.publicCard(route.params.id).then(resp => {
        card.value = resp.data
        isLoading.value = false
    })
})

function borderColor(card: Card) {
    return 'border-color: ' + card.mainColor
}
</script>

<style scoped></style>
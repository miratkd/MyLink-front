<template>
    <ModalComponent class="hidden lg:flex justify-center items-start w-5/12 ">
        <div class="relative flex flex-col items-center">
            <img class="absolute mt-16 w-24 rounded-full" :src="card?.imageUrl" alt="">
            <p data-test="card-title" class="absolute mt-44 w-5/6 bg-white text-center body-m font-bold"> {{ card?.title
                }}</p>
            <p data-test="card-email" class="absolute mt-52 color-gray w-5/6 bg-white text-center body-s"> {{
                card?.displayEmail }}</p>
            <div class="absolute mt-64 w-10/12 bg-white overflow-auto remove-scroll" style="height: 54%;">
                <p data-test="card-description" class="body-s color-gray text-center mb-6">{{ card?.description }}</p>
                <LinkButton class="mt-3" v-for="link in componentLinks" :key="link.id" :link="link" />
            </div>
            <img src="@/assets/illustration-phone-mockup.svg" alt="">
        </div>
    </ModalComponent>
</template>

<script setup lang="ts">
import type { Card, Link } from '~/interfaces';

const props = defineProps({
    card: { type: Object as () => Card, required: true },
    componentLinks: {type: Array<Link>, required: true}
})
</script>

<style scoped lang="sass">

</style>
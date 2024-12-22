<template>
    <div>
        <div class="flex items-center bg-white px-4 py-5 justify-between">
            <img class="w-7" src="~/assets/logo-devlinks-small.svg" alt="" @click="navigateTo('/dashboard')">
            <div class="flex gap-x-2">
                <img @click="tab = 'links'" role="button" :class="{ 'bg-purple-100': tab == 'links' }"
                    src="~/assets/icon-links-header.svg" class="  rounded px-4 py-1" alt="">
                <img @click="tab = 'card'" role="button" :class="{ 'bg-purple-100': tab == 'card' }"
                    src="~/assets/icon-profile-details-header.svg" class="  rounded px-4 py-1" alt="">
            </div>
            <img class="w-11 text-purple-500 border border-solid rounded border-purple-700 px-2 py-1"
                src="~/assets/icon-preview-header.svg" alt="">
        </div>
        <div class="px-4 py-3">
            <button @click="addLink(1, 'https://www.youtube.com/')">add link</button>
            <CardLinksTab v-if="tab == 'links' && card" :card="card"/>
        </div>

        <LoadingComponent v-if="isLoading"/>
    </div>
</template>

<script setup lang="ts">
import RequestService from '~/services/RequestService';
import type { Card, Plataform } from '~/interfaces';

const tab = ref('links')
const isLoading = ref(true)
const card = ref<Card|undefined>()
const plataforms = ref<Plataform[]>([])
const service = new RequestService()
const route = useRoute()

onMounted(()=>{
    const cardsRequest = service.getCard(localStorage.getItem('token'),route.params.id)
    const plataformsRequest = service.getPlataforms(localStorage.getItem('token'))
    Promise.all([cardsRequest, plataformsRequest]).then(resp=>{
        card.value = resp[0].data
        plataforms.value = resp[1].data
        isLoading.value = false
    })
})

function addLink (id: number, link: string){
    const payload = {
        link,
        plataformId: id,
        cardId: route.params.id
    }
    service.addLink(localStorage.getItem('token'), payload).then(resp => {
        card.value = resp.data
    })
}

</script>

<style lang="sass" scoped>
</style>
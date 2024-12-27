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
            <CardLinksTab v-if="tab == 'links' && !isLoading" :addLink="addLink" :updateLinks="updateLink" :card="card!" :plataforms="plataforms"/>
        </div>

        <LoadingComponent v-if="isLoading"/>
    </div>
</template>

<script setup lang="ts">
import RequestService from '~/services/RequestService';
import type { Card, Link, Plataform } from '~/interfaces';

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
        plataforms.value = resp[1].data.data
        card.value?.links?.forEach(link => {link.plataform = plataforms.value.find(p => p.name == link.plataformName)})
        isLoading.value = false
    })
})

function addLink (id: number, link: string){
    isLoading.value = true
    const payload = {
        link,
        plataformId: id,
        cardId: route.params.id
    }
    service.addLink(localStorage.getItem('token'), payload).then(resp => {
        card.value = resp.data
        isLoading.value = false
    })
}

function updateLink( links: Link[]){
    isLoading.value = true
    service.updateLink(localStorage.getItem('token'), route.params.id, {links: links.map(link => [link.id, link.position])}).then(resp => {
        card.value = resp.data
        card.value?.links?.forEach(link => {link.plataform = plataforms.value.find(p => p.name == link.plataformName)})
        isLoading.value = false
    })
}
</script>

<style lang="sass" scoped>
</style>
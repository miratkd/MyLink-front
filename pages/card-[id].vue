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
            <CardLinksTab v-if="tab == 'links'" :removeLink="clickRemove" :addLink="addLink" :updateLinksOrder="updateLinksOrder" :updateLink="updateLink" :card="card!" :plataforms="plataforms"/>
            <CardDetailsTab v-else :card="card!" :updateCard="updateCard"/>
        </div>

        <LoadingComponent v-if="isLoading"/>
        <ConfimModal v-if="showConfirm" :remove="removeLink" :close="() => showConfirm = undefined"/>
    </div>
</template>

<script setup lang="ts">
import RequestService from '~/services/RequestService';
import type { Card, Link, Plataform } from '~/interfaces';
import ConfimModal from '~/components/ConfimModal.vue';

const tab = ref('links')
const isLoading = ref(true)
const card = ref<Card|undefined>()
const plataforms = ref<Plataform[]>([])
const showConfirm = ref<undefined | Link>()
const service = new RequestService()
const route = useRoute()

onMounted(()=>{
    const cardsRequest = service.getCard(localStorage.getItem('token'),route.params.id)
    const plataformsRequest = service.getPlataforms(localStorage.getItem('token'))
    Promise.all([cardsRequest, plataformsRequest]).then(resp=>{
        plataforms.value = resp[1].data.data
        loadPage(resp[0])
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
        loadPage(resp)
    })
}

function updateLinksOrder( links: Link[]){
    isLoading.value = true
    service.updateLinksOrder(localStorage.getItem('token'), route.params.id, {links: links.map(link => [link.id, link.position])}).then(resp => {
        loadPage(resp)
    })
}

function loadPage(resp:any) {
    card.value = resp.data
    card.value?.links?.forEach(link => {link.plataform = plataforms.value.find(p => p.name == link.plataformName)})
    isLoading.value = false
}

function updateLink(link: Link) {
    const payload = {
        "link": link.link,
        "position": link.position,
        "plataformId": link.plataform?.id
    }
    isLoading.value = true
    service.updateLink(localStorage.getItem('token'), link.id, payload).then(resp => {
        isLoading.value = false
        link.isSaved = false
    })
}
function clickRemove(link: Link) {
    showConfirm.value = link
}

function removeLink() {
    isLoading.value = true
    service.deleteLink(localStorage.getItem('token'), showConfirm.value!.id).then(resp => {
        showConfirm.value = undefined
        loadPage(resp)
    })
    
}

function updateCard(payload:Object) {
    isLoading.value = true
    service.updateCard(localStorage.getItem('token'), card.value?.id, payload).then(resp => {
        resp.data.links = card.value?.links
        card.value = resp.data
        isLoading.value = false
    })
}
</script>

<style lang="sass" scoped>
</style>
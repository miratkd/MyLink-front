<template>
    <div>
        <div class="flex items-center bg-white px-4 py-5 justify-between">
            <img data-test="dashboard-title" class="w-7" src="~/assets/logo-devlinks-small.svg" alt="">
            <img @click="logout" class="w-11 text-purple-500 border border-solid rounded border-purple-700 px-2 py-1"
                src="~/assets/logout-icon.svg" alt="">
        </div>
        <div class="px-4 py-3">
            <ModalComponent class="p-3">
                <h1 class="heading-s" >Customize os seus cartões</h1>
                <p class="body-m color-gray">Adicione / edite / remova os cartões abaixo e então compartilhe eles com o mundo!</p>
                <ButtonSecondary font="heading-s" @click="showCreateCard = true" text="+ Cartão" class="mt-7 w-full "/>
                <EmptyCards v-if="!isLoading && cards.length == 0"/>
                <CardComponent v-for="card in cards" :deleteCard="id => deleteCardId = id" :card="card" />
            </ModalComponent>
        </div>
        <CreateCard v-if="showCreateCard" :updatePage="loadPage" :close="()=>showCreateCard=false"/>
        <DeleteCardModal v-if="deleteCardId" :id="deleteCardId" :updatePage="loadPage" :close="() => deleteCardId = 0"/>
        <LoadingComponent v-if="isLoading"/>
    </div>
</template>

<script setup>
import RequestService from '~/services/RequestService';

let cards = ref([])
let isLoading = ref(true)
let showCreateCard = ref(false)
let deleteCardId = ref(0)
const service = new RequestService()

onBeforeMount(() => {
    if (!localStorage.getItem('token')) navigateTo('/')
    loadPage()
})

function loadPage() {
    isLoading.value = true
    service.getMyCards(localStorage.getItem('token')).then(resp => {
        cards.value = resp.data.data
        isLoading.value = false
    }).catch(error => {
        if (error.response.data.message == 'Unauthenticated.') logout()
    })
}
function logout() {
    localStorage.removeItem('token')
    navigateTo('/')
}

</script>

<style lang="sass" scoped>
.border-purple-700
    border-color: var(--purple)
</style>
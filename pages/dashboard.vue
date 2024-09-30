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
                <ButtonSecondary text="+ Cartão" class="mt-7"/>
                
            </ModalComponent>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import RequestService from '~/services/RequestService';

let cards = ref([])
const service = new RequestService()

onBeforeMount(() => {
    if (!localStorage.getItem('token')) navigateTo('/')
    service.getMyCards(localStorage.getItem('token')).then(resp => {
        cards.value = resp.data.data
    })
})

function logout() {
    localStorage.removeItem('token')
    navigateTo('/')
}

</script>

<style lang="sass" scoped>
.border-purple-700
    border-color: var(--purple)
</style>
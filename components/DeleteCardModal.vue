<template>
    <div @click="() => props.close()" class="bg-gray-500/50 fixed z-10 top-0 left-0 h-dvh w-dvw flex items-center justify-center">
        <ModalComponent @click.stop class="w-4/5 md:w-3/5">
            <h3 class="heading-s text-center">Tem certeza que deseja remover esse cartão?</h3>
            <div class="w-full flex justify-between mt-5 md:justify-around">
                <ButtonComponent @click="deleteCard()" class="py-0 md:w-1/3" text="Sim, remover"/>
                <ButtonSecondary class="py-0 md:w-1/3" @click="close()" text="não"/>
            </div>
        </ModalComponent>
        <LoadingComponent v-if="isLoading"/>
    </div>
</template>

<script setup>
import RequestService from '~/services/RequestService';

const service = new RequestService
let isLoading = ref(false)

const props = defineProps({
    close: Function,
    id: Number,
    updatePage: Function
})

function deleteCard() {
    isLoading.value = true
    service.deleteCard(localStorage.getItem('token'), props.id).then(()=>{
        props.close()
        props.updatePage()
    }).catch(error => {
        if (error.response.data.message == 'Unauthenticated.') logout()
        isLoading = false
    })
}
function logout() {
    localStorage.removeItem('token')
    navigateTo('/')
}
</script>

<style lang="sass" scoped>

</style>
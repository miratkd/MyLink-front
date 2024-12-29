<template>
    <div @click="() => props.close()"
        class="bg-gray-500/50 fixed z-10 top-0 left-0 h-dvh w-dvw flex items-center justify-center ">
        <ModalComponent @click.stop class="w-4/5 md:w-3/5 lg:w-2/5 flex flex-col items-center">
            <h3 data-test="remove-card-modal" class="heading-s text-center">Tem certeza que deseja remover esse cartão?
            </h3>
            <ButtonComponent data-test="remove-card-button" @click="deleteCard()" class="mt-4 py-0 md:w-1/3 lg:py-1"
                text="Remover" />
        </ModalComponent>
        <LoadingComponent v-if="isLoading" />
    </div>
</template>

<script setup lang="ts">
import RequestService from '~/services/RequestService';

const service = new RequestService
let isLoading = ref(false)

const props = defineProps({
    close: { type: Function, required: true },
    id: { type: Number, required: true },
    updatePage: { type: Function, required: true }
})

function deleteCard() {
    isLoading.value = true
    service.deleteCard(localStorage.getItem('token'), props.id).then(() => {
        props.close()
        props.updatePage()
    }).catch(error => {
        if (error.response.data.message == 'Unauthenticated.') logout()
        isLoading.value = false
    })
}
function logout() {
    localStorage.removeItem('token')
    navigateTo('/')
}
</script>

<style lang="sass" scoped>

</style>
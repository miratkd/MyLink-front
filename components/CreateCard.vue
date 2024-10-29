<template>
    <div @click="() => props.close()" class="bg-gray-500/50 fixed z-10 top-0 left-0 h-dvh w-dvw flex items-center justify-center">
        <ModalComponent @click.stop class="md:w-3/4 lg:w-1/2">
            <h1 data-test="create-card-modal" class="heading-m md:text-center">Novo cartão</h1>
            <p class="body-m color-gray md:text-center">Vamos criar um novo cartão de visita para você!</p>
            <form @submit.prevent="() => { }">
                <p data-test="title-label" :class="{ 'text-red-500': titleAlert }" class="body-s color-dark-gray mt-4">
                    Titulo</p>
                <InputComponent data-test="title-input" @keydown="titleAlert=''" :alert="titleAlert" v-model="title" icon="email" placeholder="Luan - Fotografo" />
                <p data-test="email-label" :class="{ 'text-red-500': emailAlert }" class="body-s color-dark-gray mt-4">
                    email</p>
                <InputComponent type="email" data-test="email-input" @keydown="emailAlert=''" v-model="email" :alert="emailAlert" icon="name" placeholder="Luan@gmail.com" />
                <p data-test="email-label" class="body-s color-dark-gray mt-4">
                    Link para imagem do perfil (opcional)</p>
                <InputComponent data-test="image-input" v-model="image" icon="image" placeholder="https://media.licdn.com/dms/image/v2/D4D03AQHeXikmtY" />
                <p data-test="description-label" :class="{ 'text-red-500': descriptionAlert }"
                    class="body-s color-dark-gray mt-4">Descrição</p>
                <TextAreaComponent data-test="description-input" @keydown="descriptionAlert=''" :alert="descriptionAlert" v-model="description" icon="password"
                    placeholder="apaixonado por fotografia..." />
                <span class="body-s color-gray">{{ description.length }}/255</span>
                <p data-test="color-label" :class="{ 'text-red-500': false }" class="body-s color-dark-gray mt-4">Cor
                    principal</p>
                <ColorInput data-test="color-input" v-model="color"/>


                <ButtonComponent data-test="create-card-button" @click="createCard()" text="Criar um novo cartão" class="w-full mt-10" />
            </form>
        </ModalComponent>
        <LoadingComponent v-if="isLoading"/>
    </div>
</template>

<script setup>
import RequestService from '~/services/RequestService';

const props = defineProps({
    close: Function,
    updatePage: Function
})

let titleAlert = ref('')
let title = ref('')
let emailAlert = ref('')
let email = ref('')
let color = ref('#633CFF')
let descriptionAlert = ref('')
let description = ref('')
let isLoading = ref(false)
let image = ref('')
const service = new RequestService()

function createCard() {
    if (!validateEmail(email.value)) emailAlert.value = 'insira um email valido'
    if (!title.value) titleAlert.value = 'insira um titulo'
    if (title.value.length > 255) titleAlert.value = 'titulo muito longo'
    if (!description.value) descriptionAlert.value = 'insira uma descrição'
    if (description.value.length > 255) descriptionAlert.value = 'descrição muito longa'
    if (emailAlert.value || titleAlert.value || descriptionAlert.value) return
    isLoading.value = true
    service.createCard(localStorage.getItem('token'), {
        "title": title.value,
        "displayEmail": email.value,
        "mainColor": color.value,
        "description": description.value,
        "imageUrl": image.value || "https://th.bing.com/th/id/R.fa9644da6ad44f8c0ec711b9f9108a43?rik=mtnwYzeG7DURFg&pid=ImgRaw&r=0"
    }).then(() => {
        props.close()
        props.updatePage()
    }).catch(error => {
        if (error.response.data.message == 'Unauthenticated.') logout()
        isLoading = false
    })
    
}
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function logout() {
    localStorage.removeItem('token')
    navigateTo('/')
}
</script>

<style lang="sass" scoped>
.text-red-500
    color: var(--red)
</style>
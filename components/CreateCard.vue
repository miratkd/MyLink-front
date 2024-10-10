<template>
    <div @click="() => props.close()" class="bg-gray-500/50 fixed z-10 top-0 left-0 h-dvh w-dvw flex items-center justify-center">
        <ModalComponent @click.stop>
            <h1 data-test="create-card-modal" class="heading-m">Novo cartão</h1>
            <p class="body-m color-gray">Vamos criar um novo cartão de visita para você!</p>
            <form @submit.prevent="() => { }">
                <p data-test="title-label" :class="{ 'text-red-500': titleAlert }" class="body-s color-dark-gray mt-4">
                    Titulo</p>
                <InputComponent data-test="title-input" @keydown="titleAlert=''" :alert="titleAlert" v-model="title" icon="email" placeholder="Luan - Fotografo" />
                <p data-test="email-label" :class="{ 'text-red-500': emailAlert }" class="body-s color-dark-gray mt-4">
                    email</p>
                <InputComponent data-test="email-input" @keydown="emailAlert=''" v-model="email" :alert="emailAlert" icon="name" placeholder="Luan@gmail.com" />
                <p data-test="description-label" :class="{ 'text-red-500': descriptionAlert }"
                    class="body-s color-dark-gray mt-4">Descrição</p>
                <TextAreaComponent data-test="description-input" @keydown="descriptionAlert=''" :alert="descriptionAlert" v-model="description" icon="password"
                    placeholder="apaixonado por fotografia..." />
                <p data-test="color-label" :class="{ 'text-red-500': false }" class="body-s color-dark-gray mt-4">Cor
                    principal</p>
                <ColorInput data-test="color-input" v-model="color"/>


                <ButtonComponent data-test="create-card-button" @click="createCard()" text="Criar um novo cartão" class="w-full mt-10" />
            </form>
        </ModalComponent>
    </div>
</template>

<script setup>


const props = defineProps({
    close: Function
})

let titleAlert = ref('')
let title = ref('')
let emailAlert = ref('')
let email = ref('')
let color = ref('#633CFF')
let descriptionAlert = ref('')
let description = ref('')

function createCard() {
    if (!validateEmail(email.value)) emailAlert.value = 'insira um email valido'
    if (!title.value) titleAlert.value = 'insira um titulo'
    if (!description.value) descriptionAlert.value = 'insira uma descrição'
    if (emailAlert.value || titleAlert.value || descriptionAlert.value) return
    console.log('request');
    
}
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
</script>

<style lang="sass" scoped>

</style>
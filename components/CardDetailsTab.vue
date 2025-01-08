<template>
    <div class="flex justify-between items-start">

        <ModalComponent class="p-3 w-full lg:w-1/2">
            <h1 data-test="card-details-title" class="heading-s">Detalhes do cartão</h1>
            <p class="body-m color-gray">Adicione detalhes para dar um toque pessoal ao seu cartão de visita.</p>

            <div class="mt-5 w-full rounded bg-gray-100 px-2 py-3 cursor-grab">
                <p data-test="title-label" :class="{ 'text-red-500': titleAlert }" class="body-s color-dark-gray mt-4">
                    Titulo</p>
                <InputComponent data-test="title-input" @keydown="titleAlert=''" :alert="titleAlert" v-model="title" icon="email" placeholder="Luan - Fotografo" />
                <p data-test="email-label" :class="{ 'text-red-500': emailAlert }" class="body-s color-dark-gray mt-4">
                    email</p>
                <InputComponent type="email" data-test="email-input" @keydown="emailAlert=''" v-model="email" :alert="emailAlert" icon="name" placeholder="Luan@gmail.com" />
                <p data-test="email-label" class="body-s color-dark-gray mt-4">
                    Link para imagem do perfil</p>
                <InputComponent data-test="image-input" v-model="image" icon="image" placeholder="https://media.licdn.com/dms/image/v2/D4D03AQHeXikmtY" />
                <p data-test="description-label" :class="{ 'text-red-500': descriptionAlert }"
                    class="body-s color-dark-gray mt-4">Descrição</p>
                <TextAreaComponent data-test="description-input" @keydown="descriptionAlert=''" :alert="descriptionAlert" v-model="description" icon="password"
                    placeholder="apaixonado por fotografia..." />
                <span class="body-s color-gray">{{ description.length }}/255</span>
                <p data-test="color-label" :class="{ 'text-red-500': false }" class="body-s color-dark-gray mt-4">Cor
                    principal</p>
                <ColorInput data-test="color-input" v-model="color"/>
                <div class="mt-3 md:flex md:justify-end">
                   <ButtonComponent class="w-full md:w-1/4" text="Salvar" @click="saveClick()"/> 
                </div>
                
            </div>

        </ModalComponent>
    </div>
</template>

<script setup lang="ts">
import type { Card } from '~/interfaces'

const props = defineProps({
    card: { type: Object as () => Card, required: true },
    updateCard: {type: Function, required: true}
})

let titleAlert = ref('')
let title = ref(props.card.title )
let emailAlert = ref('')
let email = ref(props.card.displayEmail || '')
let color = ref(props.card.mainColor)
let descriptionAlert = ref('')
let description = ref(props.card.description)
let image = ref(props.card.imageUrl)

function saveClick() {
    if (!validateEmail(email.value)) emailAlert.value = 'insira um email valido'
    if (!title.value) titleAlert.value = 'insira um titulo'
    if (title.value.length > 255) titleAlert.value = 'titulo muito longo'
    if (!description.value) descriptionAlert.value = 'insira uma descrição'
    if (description.value.length > 255) descriptionAlert.value = 'descrição muito longa'
    if (emailAlert.value || titleAlert.value || descriptionAlert.value) return
    const payload = {
        "title": title.value,
        "mainColor": color.value,
        "description": description.value,
        "imageUrl": image.value,
        "email": email.value
    }
    props.updateCard(payload)
}

function validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
</script>

<style scoped lang="sass">

</style>
<template>
    <div class="flex justify-between items-start">
        <MobilePreview :card="card!" :component-links="componentLinks" />
        <ModalComponent class="p-3 w-full lg:w-1/2">
            <h1 data-test="card-details-title" class="heading-s">Detalhes do cartão</h1>
            <p class="body-m color-gray">Adicione detalhes para dar um toque pessoal ao seu cartão de visita.</p>

            <div class="mt-5 w-full rounded bg-gray-100 px-2 py-3 ">
                <p data-test="title-label" :class="{ 'text-red-500': titleAlert }" class="body-s color-dark-gray mt-4">
                    Titulo</p>
                <InputComponent data-test="title-input" @keydown="titleAlert=''" :alert="titleAlert" v-model="card.title" icon="email" placeholder="Luan - Fotografo" />
                <p data-test="email-label" :class="{ 'text-red-500': emailAlert }" class="body-s color-dark-gray mt-4">
                    email</p>
                <InputComponent type="email" data-test="email-input" @keydown="emailAlert=''" v-model="card.displayEmail!" :alert="emailAlert" icon="name" placeholder="Luan@gmail.com" />
                <p data-test="email-label" class="body-s color-dark-gray mt-4">
                    Link para imagem do perfil</p>
                <InputComponent data-test="image-input" v-model="props.card.imageUrl" icon="image" placeholder="https://media.licdn.com/dms/image/v2/D4D03AQHeXikmtY" />
                <p data-test="description-label" :class="{ 'text-red-500': descriptionAlert }"
                    class="body-s color-dark-gray mt-4">Descrição</p>
                <TextAreaComponent data-test="description-input" @keydown="descriptionAlert=''" :alert="descriptionAlert" v-model="props.card.description" icon="password"
                    placeholder="apaixonado por fotografia..." />
                <span class="body-s color-gray">{{ props.card.description.length }}/255</span>
                <p data-test="color-label" :class="{ 'text-red-500': false }" class="body-s color-dark-gray mt-4">Cor
                    principal</p>
                <ColorInput data-test="color-input" v-model="card.mainColor"/>
                <div class="mt-3 md:flex md:justify-end">
                   <ButtonComponent class="w-full md:w-1/4" text="Salvar" @click="saveClick()"/> 
                </div>
                
            </div>

        </ModalComponent>
    </div>
</template>

<script setup lang="ts">
import type { Card, Link } from '~/interfaces'

const props = defineProps({
    card: { type: Object as () => Card, required: true },
    updateCard: {type: Function, required: true}
})

const componentLinks = ref<Link[]>([])
let titleAlert = ref('')
let emailAlert = ref('')
let descriptionAlert = ref('')

onMounted(() => {
    if (props.card) componentLinks.value = props.card.links!
})
function saveClick() {
    if (!validateEmail(props.card.displayEmail)) emailAlert.value = 'insira um email valido'
    if (!props.card.title) titleAlert.value = 'insira um titulo'
    if (props.card.title.length > 255) titleAlert.value = 'titulo muito longo'
    if (!props.card.description) descriptionAlert.value = 'insira uma descrição'
    if (props.card.description.length > 255) descriptionAlert.value = 'descrição muito longa'
    if (emailAlert.value || titleAlert.value || descriptionAlert.value) return
    const payload = {
        "title": props.card.title,
        "mainColor": props.card.mainColor,
        "description": props.card.description,
        "imageUrl": props.card.imageUrl,
        "email": props.card.displayEmail
    }
    props.updateCard(payload)
}

function validateEmail(email: string|undefined) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email||'');
}
</script>

<style scoped lang="sass">

</style>
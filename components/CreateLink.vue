<template>
    <div @click="props.close()"
        class="bg-gray-500/50 fixed z-10 top-0 left-0 h-dvh w-dvw flex items-center justify-center">
        <ModalComponent @click.stop class="md:w-2/4 lg:w-2/5 relative">
            <h1 data-test="create-link-modal" class="heading-m md:text-center">Novo link</h1>
            <p class="body-m color-gray md:text-center">Vamos adicionar um novo link!</p>
            <p data-test="title-label" :class="{ 'text-red-500': plataformAlert }" class="body-s color-dark-gray mt-4">Plataforma</p>
            <PlataformSelect :options="options" :alert="plataformAlert" v-model="selectedPlataform" testName="new"/>
            <span v-if="plataformAlert" data-test="input-alert" class="absolute right-4 text-red-400 body-s">{{ plataformAlert }}</span>
            <p data-test="title-label" :class="{ 'text-red-500': linkAlert }" class="body-s color-dark-gray mt-4">Link</p>
            <InputComponent data-test="new-input" @keydown="linkAlert=''" :alert="linkAlert" v-model="linkUrl" icon="name" placeholder="https://..." />

            <ButtonComponent data-test="create-link-button" @click="addLinkClick()"  text="Criar link" class="w-full mt-10" />
        </ModalComponent>
    </div>
</template>

<script setup lang="ts">
import type { Plataform } from '~/interfaces';

const props = defineProps({
    close: { type: Function, required: true },
    options: {type: Array<Plataform>, required: true},
    addLink: {type:Function, required:true}
})
const selectedPlataform = ref<Plataform | undefined>()
const linkUrl = ref('')
const plataformAlert = ref('')
const linkAlert = ref('')

function addLinkClick(){
    
    if (!linkUrl.value) linkAlert.value = 'Insira um link'
    if (!selectedPlataform.value) plataformAlert.value = 'Selecione uma plataforma'
    props.addLink(selectedPlataform.value?.id, linkUrl.value)
    props.close()
}

watch(selectedPlataform, ()=> {
    plataformAlert.value = ''
})
</script>

<style lang="scss" scoped></style>
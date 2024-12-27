<template>
    <ModalComponent class="p-3">
        <h1 data-test="card-title" class="heading-s">Adicionar links</h1>
        <p class="body-m color-gray">Adicione / edite / remova os links do seu cartão.</p>
        <ButtonSecondary data-test="add-new-link" @click="showCreateLink = true" font="heading-s" text="+ Novo link"
            class="mt-7 w-full " />
        <draggable v-model="componentLinks" item-key="id" @change="updateList()">
            <template #item="{element}" >
                <div class="mt-5 w-full rounded bg-gray-100 px-2 py-3">
                    <div class="flex ">
                        <img class="w-4" src="~/assets/icon-drag-and-drop.svg" alt="">
                        <span class="text-base font-bold color-gray ml-2">Link #{{ element.id }}</span>
                        <button class="ml-auto color-gray">Remover</button>
                    </div>
                    <p data-test="title-label" class="body-s color-dark-gray mt-4">Plataforma</p>
                    <PlataformSelect :options="plataforms" v-model="element.plataform"/>
                    <p data-test="title-label" class="body-s color-dark-gray mt-4">Link</p>
                    <InputComponent data-test="title-input" v-model="element.link" icon="name" placeholder="https://..." />
                </div>
            </template>
        </draggable>

        <CreateLink v-if="showCreateLink" :addLink="addLink" :close="()=>showCreateLink = false" :options="plataforms"/>
    </ModalComponent>
</template>

<script setup lang="ts">
import type { Card, Link, Plataform } from '~/interfaces';
const props = defineProps({
    card: {type: Object as ()=> Card, required: true},
    plataforms: {type: Array<Plataform>, required: true},
    addLink: {type: Function, required: true},
    updateLinks: {type: Function, required: true}
})
const componentLinks = ref<Link[]>([])
const showCreateLink = ref(false)

onMounted(()=>{
    componentLinks.value = props.card.links!
})
function updateList() {
    const resp:Link[] = []
    componentLinks.value.forEach((element, idx) => {
        if (element.position != idx+1) resp.push({...element, position: idx+1})
    });
    if (resp.length>0) props.updateLinks(resp)
}

</script>

<style lang="sass" scoped>

</style>
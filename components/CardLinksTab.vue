<template>
    <ModalComponent class="p-3">
        <h1 data-test="card-title" class="heading-s">Adicionar links</h1>
        <p class="body-m color-gray">Adicione / edite / remova os links do seu cartão.</p>
        <ButtonSecondary data-test="add-new-link" @click="showCreateLink = true" font="heading-s" text="+ Novo link"
            class="mt-7 w-full " />
        <draggable v-model="componentLinks" item-key="id" >
            <template #item="{element}">
                <div class="border mt-5 h-32 size-32">{{ element.plataformName }}</div>
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
    addLink: {type: Function, required: true}
})
const componentLinks = ref<Link[]>([])
const showCreateLink = ref(false)

onMounted(()=>{
    componentLinks.value = props.card.links!  
})
watch(() => props.card,()=>{
    componentLinks.value = props.card.links!
})

</script>

<style lang="sass" scoped>

</style>
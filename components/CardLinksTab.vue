<template>
    <ModalComponent class="p-3">
        <h1 data-test="card-title" class="heading-s">Adicionar links</h1>
        <p class="body-m color-gray">Adicione / edite / remova os links do seu cartão.</p>
        <ButtonSecondary data-test="add-new-link" font="heading-s" text="+ Novo link"
            class="mt-7 w-full " />
        <draggable v-model="componentLinks" item-key="id" >
            <template #item="{element}">
                <div class="border mt-5 h-32 size-32">{{ element.plataformName }}</div>
            </template>
        </draggable>
    </ModalComponent>
</template>

<script setup lang="ts">
import type { Card, Link } from '~/interfaces';
const props = defineProps({
    card: {type: Object as ()=> Card, required: true}
})
const componentLinks = ref<Link[]>([])

onMounted(()=>{
    componentLinks.value = props.card.links!
})
watch(() => props.card,()=>{
    componentLinks.value = props.card.links!
})

</script>

<style lang="sass" scoped>

</style>
<template>
    <div class="flex justify-between">
        <ModalComponent class="hidden lg:flex justify-center items-start w-5/12">
            <div class="relative">
                <img src="@/assets/illustration-phone-mockup.svg" alt="">
            </div>
        </ModalComponent>
        <ModalComponent class="p-3 w-full lg:w-1/2">
            <h1 data-test="card-title" class="heading-s">Adicionar links</h1>
            <p class="body-m color-gray">Adicione / edite / remova os links do seu cartão.</p>
            <ButtonSecondary data-test="add-new-link" @click="showCreateLink = true" font="heading-s" text="+ Novo link"
                class="mt-7 w-full " />
            <draggable v-model="componentLinks" item-key="id" @change="updateList()">
                <template #item="{ element }">
                    <div class="mt-5 w-full rounded bg-gray-100 px-2 py-3">
                        <div class="flex ">
                            <img class="w-4" src="~/assets/icon-drag-and-drop.svg" alt="">
                            <span class="text-base font-bold color-gray ml-2">Link #{{ element.id }}</span>
                            <button @click="removeLink(element)" class="ml-auto color-gray">Remover</button>
                        </div>
                        <p data-test="title-label" class="body-s color-dark-gray mt-4">Plataforma</p>
                        <PlataformSelect :options="plataforms" v-model="element.plataform"
                            @change="changeLink(element)" />
                        <p data-test="title-label" class="body-s color-dark-gray mt-4">Link</p>
                        <InputComponent data-test="title-input" @change="changeLink(element)" v-model="element.link"
                            icon="name" placeholder="https://..." />
                        <div class="flex justify-center mt-3 h-8">
                            <ButtonComponent @click="updateLink(element)" class="w-4/5" v-if="element.isSaved"
                                text="SALVAR" />
                        </div>
                    </div>
                </template>
            </draggable>

            <CreateLink v-if="showCreateLink" :addLink="addLink" :close="() => showCreateLink = false"
                :options="plataforms" />
        </ModalComponent>
    </div>

</template>

<script setup lang="ts">
import type { Card, Link, Plataform } from '~/interfaces';
const props = defineProps({
    card: { type: Object as () => Card },
    plataforms: { type: Array<Plataform>, required: true },
    addLink: { type: Function, required: true },
    updateLinksOrder: { type: Function, required: true },
    updateLink: { type: Function, required: true },
    removeLink: { type: Function, required: true }
})
const componentLinks = ref<Link[]>([])
const showCreateLink = ref(false)

onMounted(() => {
    if (props.card) componentLinks.value = props.card.links!
})
watch(() => props.card, () => {
    componentLinks.value = props.card!.links!
})
function updateList() {
    const resp: Link[] = []
    componentLinks.value.forEach((element, idx) => {
        if (element.position != idx + 1) resp.push({ ...element, position: idx + 1 })
    });
    if (resp.length > 0) props.updateLinksOrder(resp)
}

function changeLink(link: Link) {
    link.isSaved = true
}

</script>

<style lang="sass" scoped>

</style>
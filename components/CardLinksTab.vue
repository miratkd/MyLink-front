<template>
    <ModalComponent class="p-3">
        <h1 data-test="card-title" class="heading-s">Adicionar links</h1>
        <p class="body-m color-gray">Adicione / edite / remova os links do seu cartão.</p>
        <ButtonSecondary data-test="add-new-link" font="heading-s" @click="addNewLink()" text="+ Novo link"
            class="mt-7 w-full " />
        <draggable v-model="myArray" item-key="name" >
            <template #item="{element}">
                <div class="border mt-5 h-32 size-32">{{ element.name }}</div>
            </template>
        </draggable>
    </ModalComponent>
</template>

<script setup lang="ts">
let myArray = ref([
    {name: '111'},
    {name: '222'},
    {name: '333'},
    {name: '444'},
    {name: '555'},
    {name: '666'},
    {name: '777'},
    {name: '888'},
    {name: '999'},
])
function addNewLink() {

}
</script>

<style lang="sass" scoped>

</style>
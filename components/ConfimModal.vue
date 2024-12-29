<template>
    <div @click="close()" class="fixed z-5 top-0 h-screen w-screen bg-gray-500/50 flex justify-center items-center">
        <ModalComponent @click.stop class="w-5/6 md:w-4/6 flex flex-col items-center ">
            <h1 class="heading-s text-center">Tem certeza que deseja excluir esse link?</h1>
            <ButtonComponent @click="remove()" text="Excluir" class="mt-3" />
        </ModalComponent>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    close: {type: Function, required: true},
    remove: {type: Function, required: true}
})

</script>

<style scoped lang="sass">

</style>
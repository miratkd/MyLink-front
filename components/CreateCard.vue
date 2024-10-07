<template>
    <div class="bg-gray-500/50 fixed z-10 top-0 left-0 h-dvh w-dvw flex items-center justify-center">
        <ModalComponent>
            <h1 data-test="create-card-modal" class="heading-m">Novo cartão</h1>
            <p class="body-m color-gray">Vamos criar um novo cartão de visita para você!</p>
            <form @submit.prevent="() => { }">
                <p data-test="title-label" :class="{ 'text-red-500': false }" class="body-s color-dark-gray mt-4">
                    Titulo</p>
                <InputComponent data-test="title-input" v-model="title" icon="email" placeholder="Luan - Fotografo" />
                <p data-test="email-label" :class="{ 'text-red-500': false }" class="body-s color-dark-gray mt-4">
                    email</p>
                <InputComponent data-test="email-input" v-model="email" icon="name" placeholder="Luan@gmail.com" />
                <p data-test="description-label" :class="{ 'text-red-500': false }"
                    class="body-s color-dark-gray mt-4">Descrição</p>
                <InputComponent data-test="description-input" v-model="description" icon="password"
                    placeholder="apaixonado por fotografia..." />
                <p data-test="color-label" :class="{ 'text-red-500': false }" class="body-s color-dark-gray mt-4">Cor
                    principal</p>
                <ColorInput data-test="color-input" v-model="color"/>


                <ButtonComponent data-test="create-card-button" text="Criar um novo cartão" class="w-full mt-10" />
            </form>
        </ModalComponent>
    </div>
</template>

<script setup>

let title = ref('')
let email = ref('')
let color = ref('#633CFF')
let description = ref('')
</script>

<style lang="sass" scoped>

</style>
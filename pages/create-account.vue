<template>
    <div class="flex flex-col justify-center items-center w-screen h-dvh">
        <PageHeader />
        <ModalComponent class="w-10/12 md:w-6/12 lg:w-1/4">
            <h1 data-test="create-account-title" class="heading-m">Criar conta</h1>
            <p class="body-m color-gray">Vamos te preparar para criar os seus links</p>
            <form @submit.prevent="createAccount()">
                <p data-test="email-label" :class="{ 'text-red-500': emailAlert }" class="body-s color-dark-gray mt-4">
                    Endereço de email</p>
                <InputComponent data-test="email-input" @click="emailAlert = ''" :alert="emailAlert" icon="email"
                    v-model="email" placeholder="e.g. alex@email.com" />
                <p data-test="name-label" :class="{ 'text-red-500': nameAlert }" class="body-s color-dark-gray mt-4">
                    Nome</p>
                <InputComponent data-test="name-input" @click="nameAlert = ''" :alert="nameAlert" icon="name"
                    v-model="name" placeholder="Nome da conta" />
                <p data-test="password-label" :class="{ 'text-red-500': passwordAlert }"
                    class="body-s color-dark-gray mt-4">Senha</p>
                <InputComponent data-test="password-input" @click="passwordAlert = ''" :alert="passwordAlert"
                    icon="password" v-model="password" type="password" placeholder="Ao menos 8 caracteres" />
                <p data-test="confirm-password-label" :class="{ 'text-red-500': passwordAlert }"
                    class="body-s color-dark-gray mt-4">Confirmar senha</p>
                <InputComponent data-test="confirm-password-input" @click="passwordAlert = ''" :alert="passwordAlert"
                    icon="password" v-model="confirmPassword" type="password" placeholder="Ao menos 8 caracteres" />

                <p class="body-s color-gray mt-4">A senha deve ter ao menos 8 caracteres</p>


                <ButtonComponent data-test="create-account-button" text="Criar uma nova conta" class="w-full mt-10" />
            </form>

            <p class="body-m color-gray text-center mt-2">Já possui uma conta? <NuxtLink to="/" data-test="home-button"
                    class="color-purple cursor-pointer">Login.</NuxtLink>
            </p>
        </ModalComponent>
        <LoadingComponent v-if="isLoading"/>
    </div>
</template>

<script setup>
import RequestService from '~/services/RequestService';
import { useUserStore } from '~/stores/user';

let email = ref('')
let password = ref('')
let name = ref('')
let nameAlert = ref('')
let confirmPassword = ref('')
let emailAlert = ref('')
let passwordAlert = ref('')
let isLoading = ref(false)
const store = useUserStore()
const service = new RequestService()

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function createAccount() {
    if (!validateEmail(email.value)) emailAlert.value = 'insira um email valido'
    if (password.value != confirmPassword.value) passwordAlert.value = 'senhas diferentes'
    if (password.value.length < 8) passwordAlert.value = 'senha muito curta'
    if (!name.value) nameAlert.value = 'insira um nome'
    if (!password.value || !confirmPassword.value) passwordAlert.value = 'insira uma senha'
    if (!email.value) emailAlert.value = 'insira um email'
    if (emailAlert.value || passwordAlert.value || nameAlert.value) return
    isLoading.value = true
    service.createAccount(email.value, name.value, password.value).then(() => {
        store.savedEmail = email
        store.savedPassword = password
        navigateTo('/')
    }).catch(error => {
        if (error.response.data.message == 'The email has already been taken.'){
            emailAlert.value = 'email já em uso'
            isLoading.value = false
        }
    })
}

</script>

<style lang="sass" scoped>
.text-red-500
    color: var(--red)
</style>
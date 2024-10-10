<template>
    <div class="flex flex-col justify-center items-center w-screen h-dvh">
        <PageHeader/>
        <ModalComponent class="w-10/12 md:w-6/12 lg:w-1/4">
            <h1 data-test="login-title" class="heading-m">Login</h1>
            <p class="body-m color-gray">Insira suas informações de acesso</p>
            <form @submit.prevent="login()">
                <p data-test="email-label" :class="{'text-red-500': alertMessage}" class="body-s color-dark-gray mt-4">Endereço de email</p>
                <InputComponent data-test="email-input" @click="alertMessage=''" :alert="alertMessage" icon="email" v-model="email" placeholder="e.g. alex@email.com"/>
                <p data-test="password-label" :class="{'text-red-500': alertMessage}" class="body-s color-dark-gray mt-4">Senha</p>
                <InputComponent data-test="password-input" @click="alertMessage=''" :alert="alertMessage" icon="password" v-model="password" type="password" placeholder="Insira sua senha"/>
                <ButtonComponent data-test="login-button" text="Login" class="w-full mt-10"/>
            </form>
            
            <p class="body-m color-gray text-center mt-2">Não possui uma conta? <NuxtLink to="/create-account" data-test="create-account-button" class="color-purple cursor-pointer">Crie uma conta.</NuxtLink ></p>
        </ModalComponent>
        <LoadingComponent v-if="isLoading"/>
    </div>
</template>

<script setup>
import RequestService from '~/services/RequestService';
import { useUserStore } from '@/stores/user'

const store = useUserStore()
let email = ref('')
let password = ref('')
let alertMessage = ref('')
let isLoading = ref(false)
const service = new RequestService()

onBeforeMount(() => {
    if (store.savedEmail) email.value = store.savedEmail
    if (store.savedPassword) password.value = store.savedPassword
    if (localStorage.getItem('token')) navigateTo('/dashboard')
})

function login() {
    if (!email.value || !password.value){
        alertMessage.value = 'Preencha os campos'
        return
    }
    isLoading.value = true
    service.login(email.value, password.value).then(resp => {
        localStorage.setItem('token', resp.data.token)
        navigateTo('/dashboard')
    }).catch(error => {
        if (error.response.status == 403 && error.response.data.error == 'Wrong credentials'){
            alertMessage.value = 'Incorreto' 
        }
        isLoading.value = false
    })
}

</script>

<style lang="sass" scoped>
.text-red-500
    color: var(--red)
</style>
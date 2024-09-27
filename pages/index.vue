<template>
    <div class="flex flex-col justify-center items-center w-screen h-screen">
        <PageHeader/>
        <ModalComponent class="w-1/4">
            <h1 data-test="login-title" class="heading-m">Login</h1>
            <p class="body-m color-gray">Insira suas informações de acesso</p>
            <form @submit.prevent="login()">
                <p data-test="email-label" :class="{'text-red-500': alertMessage}" class="body-s color-dark-gray mt-4">Endereço de email</p>
                <InputComponent data-test="email-input" @click="alertMessage=''" :alert="alertMessage" icon="email" v-model="email" placeholder="e.g. alex@email.com"/>
                <p data-test="password-label" :class="{'text-red-500': alertMessage}" class="body-s color-dark-gray mt-4">Senha</p>
                <InputComponent data-test="password-input" @click="alertMessage=''" :alert="alertMessage" icon="password" v-model="password" :isPassword="true" placeholder="Insira sua senha"/>
                <ButtonComponent data-test="login-button" text="Login" class="w-full mt-10"/>
            </form>
            
            <p class="body-m color-gray text-center mt-2">Não possui uma conta? <NuxtLink to="/create-account" data-test="create-account-button" class="color-purple cursor-pointer">Crie uma conta.</NuxtLink ></p>
        </ModalComponent>
        <LoadingComponent v-if="isLoading"/>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/stores/user';

export default {
    name: 'HomePage',
    data() {
        return {
            email: '',
            password: '',
            alertMessage: '',
            isLoading: false
        }
    },
    beforeMount () {
        if (this.userStore.savedEmail) this.email = this.userStore.savedEmail
        if (this.userStore.savedPassword) this.password = this.userStore.savedPassword
    },
    methods: {
        login() {
            if (!this.email || !this.password){
                this.alertMessage = 'Preencha os campos'
                return
            }
            this.isLoading = true
            this.userStore.request.login(this.email, this.password).then(resp => {
                this.userStore.request.token = resp.data.token
                navigateTo('/dashboard')
            }).catch(error => {
                if (error.response.status == 403 && error.response.data.error == 'Wrong credentials'){
                    this.alertMessage = 'Incorreto' 
                }
                this.isLoading = false
            })
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
}
</script>

<style lang="sass" scoped>
.text-red-500
    color: var(--red)
</style>
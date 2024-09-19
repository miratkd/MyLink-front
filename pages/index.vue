<template>
    <div class="flex flex-col justify-center items-center w-screen h-screen">
        <p class="heading-m flex gap-2 mb-8">
            <img class="w-15" src="~/assets/logo-devlinks-small.svg" alt="">
            My-Link
        </p>
        <ModalComponent class="w-1/4">
            <h1 class="heading-m">Login</h1>
            <p class="body-m color-gray">Insira suas informações de acesso</p>
            <form @submit.prevent="login()">
                <p :class="{'text-red-500': alertMessage}" class="body-s color-dark-gray mt-4">Endereço de email</p>
                <InputComponent @click="alertMessage=''" :alert="alertMessage" icon="email" v-model="email" placeholder="e.g. alex@email.com"/>
                <p :class="{'text-red-500': alertMessage}" class="body-s color-dark-gray mt-4">Senha</p>
                <InputComponent @click="alertMessage=''" :alert="alertMessage" icon="password" v-model="password" :isPassword="true" placeholder="Insira sua senha"/>
                <ButtonComponent text="Login" class="w-full mt-10"/>
            </form>
            
            <p class="body-m color-gray text-center mt-2">Não possui uma conta? <b class="color-purple cursor-pointer">Crie uma conta.</b></p>
        </ModalComponent>
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
            alertMessage: ''
        }
    },
    methods: {
        login() {
            if (!this.email || !this.password){
                this.alertMessage = 'Preencha os campos'
                return
            }
            this.userStore.request.login(this.email, this.password).then(resp => {

            }).catch(error => {
                console.log(error.response);
                if (error.response.status == 403 && error.response.data.error == 'Wrong credentials'){
                    this.alertMessage = 'Incorreto'

                }
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
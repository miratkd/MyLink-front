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
                    icon="password" v-model="password" :isPassword="true" placeholder="Ao menos 8 caracteres" />
                <p data-test="confirm-password-label" :class="{ 'text-red-500': passwordAlert }"
                    class="body-s color-dark-gray mt-4">Confirmar senha</p>
                <InputComponent data-test="confirm-password-input" @click="passwordAlert = ''" :alert="passwordAlert"
                    icon="password" v-model="confirmPassword" :isPassword="true" placeholder="Ao menos 8 caracteres" />

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

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/stores/user';

export default {
    name: "createAccountPage",
    data() {
        return {
            email: '',
            password: '',
            name: '',
            nameAlert: '',
            confirmPassword: '',
            emailAlert: '',
            passwordAlert: '',
            isLoading: false
        }
    },
    methods: {
        createAccount() {
            if (!this.validateEmail(this.email)) this.emailAlert = 'insira um email valido'
            if (this.password != this.confirmPassword) this.passwordAlert = 'senhas diferentes'
            if (this.password.length < 8) this.passwordAlert = 'senha muito curta'
            if (!this.name) this.nameAlert = 'insira um nome'
            if (!this.password || !this.confirmPassword) this.passwordAlert = 'insira uma senha'
            if (!this.email) this.emailAlert = 'insira um email'
            if (this.emailAlert || this.passwordAlert || this.nameAlert) return
            this.isLoading = true
            this.userStore.request.createAccount(this.email, this.name, this.password).then(resp => {
                this.userStore.savedEmail = this.email
                this.userStore.savedPassword = this.password
                navigateTo('/')
            }).catch(error => {
                if (error.response.data.message == 'The email has already been taken.'){
                    this.emailAlert = 'email já em uso'
                    this.isLoading = false
                }
            })

        },
        validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
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
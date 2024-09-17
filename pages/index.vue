<template>
    <div class="flex flex-col justify-center items-center w-screen h-screen">
        <p class="heading-m flex gap-2 mb-8">
            <img class="w-15" src="~/assets/logo-devlinks-small.svg" alt="">
            My-Link
        </p>
        <ModalComponent class="w-1/4">
            <h1 class="heading-m">Login</h1>
            <p class="body-m color-gray">Insira suas informações de acesso</p>
            <p class="body-s color-dark-gray mt-4">Endereço de email</p>
            <InputComponent icon="email" placeholder="e.g. alex@email.com"/>
            <p class="body-s color-dark-gray mt-4">Senha</p>
            <InputComponent icon="password" :isPassword="true" placeholder="Insira sua senha"/>
            <ButtonComponent class="w-full mt-10"/>
            <p class="body-m color-gray text-center mt-2">Não possui uma conta? <b class="color-purple cursor-pointer">Crie uma conta.</b></p>
        </ModalComponent>
    </div>
</template>

<script>

export default {
    name: 'HomePage'
}
</script>

<style lang="sass" scoped>

</style>
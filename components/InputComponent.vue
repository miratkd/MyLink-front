<template>
    <div class="border px-5 py-1 rounded mt-2 flex">
        <img v-if="icon == 'email'" src="~/assets/icon-email.svg" alt="">
        <img v-if="icon == 'password'" src="~/assets/icon-password.svg" alt="">
        <input :type="isPassword ? 'password' : 'text'" class=" w-full ml-2 body-m color-gray" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
    name: 'InputComponent',
    props: {
        icon: {
            type: String
        },
        placeholder: {
            type: String,
            default: 'Insira um valor'
        },
        isPassword: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="sass" scoped>

</style>
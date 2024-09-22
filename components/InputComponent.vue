<template>
    <div :class="{'border-red-500': alert}" class="border relative px-5 py-1 rounded mt-2 flex input-container" >
        <img v-if="icon == 'email'" src="~/assets/icon-email.svg" alt="">
        <img v-if="icon == 'password'" src="~/assets/icon-password.svg" alt="">
        <input data-test="input-field" :disabled="disabled" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="isPassword ? 'password' : 'text'" class=" w-full ml-2 body-m color-gray component-input" :placeholder="placeholder" :class="{'text-red-500': alert}">
        <span data-test="input-alert" class="absolute right-3 text-red-400 body-s">{{ alert }}</span>
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
        },
        modelValue: {
            type: String,
            required: true
        },
        disabled:{
            type: Boolean,
            default: false
        },
        alert: {
            type: String,
            default: ''
        },
    },
    emits: ['update:modelValue']
}
</script>

<style lang="sass" scoped>
.text-red-500
    color: var(--red)
.input-container
    &:focus-within
        outline: 1px solid var(--purple)
</style>
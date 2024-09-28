<template>
    <div>
        <div class="flex items-center bg-white px-4 py-5 justify-between">
            <img data-test="dashboard-title" class="w-7" src="~/assets/logo-devlinks-small.svg" alt="">
            <img @click="logout" class="w-11 text-purple-500 border border-solid rounded border-purple-700 px-2 py-1"
                src="~/assets/logout-icon.svg" alt="">
        </div>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/stores/user';

export default {
    name: 'dashboardPage',
    beforeMount() {
        if (!this.userStore.request.token) navigateTo('/')
    },
    methods: {
        logout() {
            this.userStore.request.token = ''
            localStorage.removeItem('token')
            navigateTo('/')
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
}
</script>

<style lang="sass" scoped>
.border-purple-700
    border-color: var(--purple)
</style>
<template>
    <div>
        <div class="flex items-center bg-white px-4 py-5 justify-between">
            <img class="w-7" src="~/assets/logo-devlinks-small.svg" alt="" @click="navigateTo('/dashboard')">
            <div class="flex gap-x-2">
                <img @click="tab = 'links'" role="button" :class="{ 'bg-purple-100': tab == 'links' }"
                    src="~/assets/icon-links-header.svg" class="  rounded px-4 py-1" alt="">
                <img @click="tab = 'card'" role="button" :class="{ 'bg-purple-100': tab == 'card' }"
                    src="~/assets/icon-profile-details-header.svg" class="  rounded px-4 py-1" alt="">
            </div>
            <img class="w-11 text-purple-500 border border-solid rounded border-purple-700 px-2 py-1"
                src="~/assets/icon-preview-header.svg" alt="">
        </div>
        <div class="px-4 py-3">
            <CardLinksTab v-if="tab == 'links'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
console.log(route.params.id);
let tab = ref('links')

</script>

<style lang="sass" scoped>
</style>
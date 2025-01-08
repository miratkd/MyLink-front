<template>
    <div :data-test="'link-button-'+link.id" :style="'background-color: '+link.plataform?.color" class="flex text-white items-center gap-2 px-3 py-1 rounded cursor-pointer">
        <img :src="link.plataform?.imgUrl" class="w-7 h-7" alt="">
        {{ link.plataform?.name }}
        <img src="@/assets/icon-arrow-right.svg" class="ml-auto" alt="">
    </div>
</template>

<script setup lang="ts">
import type { Link } from '~/interfaces';

    const props = defineProps({
        link:{type: Object as () => Link, required: true}
    })
</script>

<style scoped lang="sass">

</style>
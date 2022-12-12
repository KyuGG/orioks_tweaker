<template>
    <ul class="breadcrumb">
        <li><a href="/">Главная</a></li>
        <li><a :href="href">{{ name }}</a></li>
    </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string
}>()

const href = location.href
</script>

<style scoped lang="scss">

</style>
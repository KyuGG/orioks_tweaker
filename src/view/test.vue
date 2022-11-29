<template>
    <h1>TEST VUE APP</h1>
    <h2>{{ variable }}</h2>
    <Popup></Popup>
</template>

<script setup lang="ts">
import Popup from './popup/popup.vue'

console.log('hello from test vue app')
const variable = 'this text inserted dynamically'
</script>

<style scoped>
h1 {
    color: purple;
}
h2 {
    color: blueviolet;
}
</style>

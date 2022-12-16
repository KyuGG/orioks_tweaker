<template>
    <MyButton placeholder="Обнулить изменения" @click="nullNames"></MyButton>
</template>

<script setup lang="ts">
import MyButton from '../myButton.vue'
import { resetNames } from '@/functions/disciplineNames'

function nullNames() {
    alert('Все изменения сброшены.')
    resetNames()
}
</script>

<template>
    <MyButton
        placeholder="Обнулить изменения"
        value="nullChanges"
        @click="nullNames"
    ></MyButton>
</template>

<script setup lang="ts">
import MyButton from '../MyButton1.vue'
import { resetNames } from '@/functions/disciplineNames'

function nullNames() {
    alert('Все изменения сброшены.')
    resetNames()
}
</script>

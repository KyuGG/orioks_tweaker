<template>
    <span
        class="day"
        @click="saveSchedule"
    >Сохранить в ОРИОКС
    </span>
</template>

<script setup lang="ts">
import scheduleFetch from '@/helpers/scheduleFetch'

const saveSchedule = async () => {
    const group = (document.querySelector('.selection span span') as HTMLSpanElement).title

    if (group) {
        await scheduleFetch(group)
        alert('Расписание было сохранено и теперь доступно в ОРИОКСе')
    }
    else alert('Выберите группу')

    location.href = 'https://orioks.miet.ru/schedule'
}</script>

<style scoped lang="scss">
span {
    background: rgb(197, 224, 181);
}
</style>
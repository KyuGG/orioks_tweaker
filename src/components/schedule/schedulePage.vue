<template>
    <div>
        <NavPanel name="Расписание"></NavPanel>
        <h3>Группа: {{ group }}</h3>
        <MyButton
            placeholder="Выбрать"
            @click="choose"
        ></MyButton>
        <MyButton
            placeholder="Подсказки"
            @click="hints"
        ></MyButton>
        <ScheduleHints></ScheduleHints>
        <ScheduleTable :week="ch"></ScheduleTable>
    </div>
</template>

<script setup lang="ts">
import wakeUpBackground from '@/helpers/wakeUpBackground'
import GetScheduleResponse from '@/interfaces/GetScheduleResponse'
import { LessonParsed } from '@/interfaces/Lesson'
import { Ref, ref } from 'vue'
import MyButton from '../myButton.vue'
import NavPanel from '../navPanel.vue'
import ScheduleHints from './scheduleHints.vue'
import ScheduleTable from './scheduleTable.vue'

let group = ''
let schedule: LessonParsed[]
let ch: Ref<LessonParsed[]> = ref([])
let zn: Ref<LessonParsed[]> = ref([])

wakeUpBackground().then(() => {
    chrome.runtime.sendMessage({ task: 'getSchedule' }, (response: GetScheduleResponse) => {
        group = response.group
        schedule = response.schedule

        ch.value = [schedule[0], schedule[1], schedule[2]]
        zn.value = [schedule[3], schedule[4], schedule[5]]
    })
})


const choose = () => console.log('choose')
const hints = () => console.log('hints')
</script>

<style scoped lang="scss">
h3 {
    margin-top: 10px;
    border: 1px solid #dddddd;
    padding: 5px;
}
</style>

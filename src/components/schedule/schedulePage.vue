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
        <div class="content hints-active">
            <ScheduleTable :week="ch"></ScheduleTable>
        </div>
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
const ch: Ref<LessonParsed[]> = ref([])
const zn: Ref<LessonParsed[]> = ref([])
const isHintsActive = localStorage.getItem('hints')

wakeUpBackground().then(() => {
    chrome.runtime.sendMessage({ task: 'getSchedule' }, (response: GetScheduleResponse) => {
        group = response.group
        schedule = response.schedule

        ch.value = [schedule[0], schedule[1], schedule[2]]
        zn.value = [schedule[3], schedule[4], schedule[5]]
    })
})


const choose = () => console.log('choose')
const hints = () => {
    // const hints = Boolean(localStorage.getItem('hints'))
    // console.log(hints)
    // localStorage.setItem('hints', String(hints))
}
</script>

<style scoped lang="scss">
h3 {
    margin-top: 10px;
    border: 1px solid #dddddd;
    padding: 5px;
}

.content {
    transform: translateY(-60px);

    &.hints-active {
        transform: translateY(0);
    }
}
</style>

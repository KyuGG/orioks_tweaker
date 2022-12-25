<template>
    <div v-if="isScheduleLoaded">
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
        <div :class="`schedule-hints ${hintsActive}`">
            <ScheduleHints></ScheduleHints>
        </div>
        <div :class="`content ${hintsActive}`">
            <ScheduleTable
                week="ch"
                :currentWeek="currentWeek"
                :currentDay="currentDay"
                :schedule="ch"
            ></ScheduleTable>
            <ScheduleTable
                week="zn"
                :currentWeek="currentWeek"
                :currentDay="currentDay"
                :schedule="zn"
            ></ScheduleTable>
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
let schedule: LessonParsed[][]
const ch: Ref<LessonParsed[][]> = ref([])
const zn: Ref<LessonParsed[][]> = ref([])
const isScheduleLoaded = ref(false)
const hintsActive = ref(localStorage.getItem('hints')) as Ref<string>
if (hintsActive.value === null) hintsActive.value = 'hints-active'


wakeUpBackground().then(() => {
    chrome.runtime.sendMessage({ task: 'getSchedule' }, (response: GetScheduleResponse) => {
        group = response.group
        schedule = response.schedule

        ch.value = [schedule[0], schedule[1], schedule[2]]
        zn.value = [schedule[3], schedule[4], schedule[5]]

        isScheduleLoaded.value = true
    })
})


const getCurrentDay = () => {
    const day = new Date().getDay()
    return day === 0 ? 1 : day
}


/**@returns 'ch1', 'ch2', 'zn1', 'zn2', ''*/
const getCurrentWeek = () => {
    const weekBlock = document.querySelector('.small') as HTMLLinkElement
    const weekInfo = (weekBlock.textContent as string).trim().split(' ')

    const identifyWeek: Record<string, string> = {
        'числитель': 'ch',
        'знаменатель': 'zn'
    }

    const switchWeek: Record<string, string> = {
        'ch1': 'zn1',
        'zn1': 'ch2',
        'ch2': 'zn2',
        'zn2': 'ch1'
    }

    if (weekInfo.length > 1) {
        let currentWeek = identifyWeek[weekInfo[3]] + weekInfo[2]
        if (getCurrentDay() !== new Date().getDay())
            currentWeek = switchWeek[currentWeek]
        return currentWeek
    }

    return ''
}

const currentDay = getCurrentDay()
const currentWeek = getCurrentWeek()



const choose = () => {
    alert('Вы будете перенаправлены на сайт МИЭТа, выберите нужную группу а затем нажмите "Сохранить в ОРИОКС"')
    location.href = 'https://miet.ru/schedule'
}
const hints = () => {
    hintsActive.value = hintsActive.value === 'hints-active' ? '' : 'hints-active'

    localStorage.setItem('hints', hintsActive.value)
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
    transition: .3s;

    &.hints-active {
        transform: translateY(0);
    }
}

.schedule-hints {
    opacity: 0;
    transition: .3s;

    &.hints-active {
        opacity: 100%;
    }
}
</style>

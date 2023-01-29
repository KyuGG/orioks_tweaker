<template>
    <div v-if="isScheduleLoaded">
        <NavPanel name="Расписание"></NavPanel>
        <h3>Группа: {{ group }}</h3>
        <div class="buttons">
            <div>
                <MyButton
                    placeholder="Выбрать"
                    value="Выбрать"
                    @click="choose"
                ></MyButton>
                <MyButton
                    placeholder="Подсказки"
                    value="Подсказки"
                    @click="hints"
                ></MyButton>
            </div>
            <div>
                <MyButton
                    placeholder="Числитель"
                    value="ch"
                    @click="isChosenWeekCh = true"
                ></MyButton>
                <MyButton
                    placeholder="Знаменатель"
                    value="zn"
                    @click="isChosenWeekCh = false"
                ></MyButton>
            </div>
        </div>
        <div :class="`schedule-hints ${hintsActive}`">
            <ScheduleHints></ScheduleHints>
        </div>
        <div
            v-if="schedule.length"
            :class="`content ${hintsActive}`"
        >
            <ScheduleTable
                v-if="isChosenWeekCh"
                week="ch"
                :currentWeek="currentWeek"
                :currentDay="currentDay"
                :currentChosenDay="currentChosenDay"
                :schedule="ch"
            ></ScheduleTable>
            <ScheduleTable
                v-else
                week="zn"
                :currentWeek="currentWeek"
                :currentDay="currentDay"
                :currentChosenDay="currentChosenDay"
                :schedule="zn"
            ></ScheduleTable>
        </div>
        <ScheduleMobileDayChooser @click="changeDay"></ScheduleMobileDayChooser>
    </div>
</template>

<script setup lang="ts">
import wakeUpBackground from '@/helpers/wakeUpBackground'
import { CurrentWeek } from '@/interfaces/CurrentWeek'
import GetScheduleResponse from '@/interfaces/GetScheduleResponse'
import { LessonParsed } from '@/interfaces/Lesson'
import { Ref, ref } from 'vue'
import MyButton from '../myButton.vue'
import NavPanel from '../navPanel.vue'
import ScheduleHints from './scheduleHints.vue'
import ScheduleMobileDayChooser from './scheduleMobileDayChooser.vue'
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


const getCurrentWeek = (): CurrentWeek => {
    const weekBlock = document.querySelector('.small') as HTMLLinkElement

    // Если сессия
    if (!weekBlock) return ''

    const weekInfo = (weekBlock.textContent as string).trim().split(' ')

    const identifyWeek: Record<string, string> = {
        'числитель': 'ch',
        'знаменатель': 'zn'
    }

    const switchWeek: Record<CurrentWeek, CurrentWeek> = {
        'ch1': 'zn1',
        'zn1': 'ch2',
        'ch2': 'zn2',
        'zn2': 'ch1',
        '': '',
    }

    if (weekInfo.length > 1) {
        let currentWeek = identifyWeek[weekInfo[3]] + weekInfo[2] as CurrentWeek
        if (getCurrentDay() !== new Date().getDay())
            currentWeek = switchWeek[currentWeek]
        return currentWeek
    }

    return ''
}

const currentDay = getCurrentDay()
const currentChosenDay = ref(currentDay)
const currentWeek = getCurrentWeek()
const isChosenWeekCh = ref(currentWeek === '' || currentWeek.startsWith('ch'))

const changeDay = (payload: MouseEvent) => {
    const target = payload.target as HTMLButtonElement
    currentChosenDay.value = Number(target.value)
}

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

.buttons {
    display: flex;
    justify-content: space-between;

    div:last-child {
        text-align: right;
    }
}

.schedule-hints {
    opacity: 0;
    transition: .3s;
    transform: translateY(-60px);
    z-index: 0;

    &.hints-active {
        opacity: 100%;
        transform: translateY(0);
    }
}

.my-btn {
    z-index: 1;
    position: relative;
    width: 111px;
}
</style>

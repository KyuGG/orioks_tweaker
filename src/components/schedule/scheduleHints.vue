<template>
    <table class="hints">
        <tr>
            <ScheduleLesson
                :lesson="{ name: 'Лекция', type: 'lecture' }"
                currentLesson=""
                currentWeek=""
                :splittedLesson="emptySplittedLesson"
                mobileHidden=""
            ></ScheduleLesson>
            <ScheduleLesson
                :lesson="{ name: 'Лаба', type: 'lab' }"
                currentLesson=""
                currentWeek=""
                :splittedLesson="emptySplittedLesson"
                mobileHidden=""
            ></ScheduleLesson>
            <ScheduleLesson
                :lesson="{ name: 'Семинар', type: 'sem' }"
                currentLesson=""
                currentWeek=""
                :splittedLesson="emptySplittedLesson"
                mobileHidden=""
            ></ScheduleLesson>
            <ScheduleLesson
                :lesson="{ name: 'Окно', type: 'holiday' }"
                currentLesson=""
                currentWeek=""
                :splittedLesson="emptySplittedLesson"
                mobileHidden=""
            ></ScheduleLesson>
            <ScheduleLesson
                :lesson="{ name: 'Сейчас', type: 'sem' }"
                currentLesson="current-lesson"
                currentWeek=""
                :splittedLesson="emptySplittedLesson"
                mobileHidden=""
            ></ScheduleLesson>
        </tr>
    </table>
</template>

<script setup lang="ts">
import { LessonObject } from '@/interfaces/Lesson'
import ScheduleLesson from './ScheduleLesson.vue'

const emptySplittedLesson: [LessonObject, LessonObject] = [
    { name: '', type: 'holiday' },
    { name: '', type: 'holiday' }
]

</script>

<style scoped lang="scss">
table {
    width: 100%;
    margin: 10px 0;
    transition: .3s;
}

td {
    height: 50px;
    width: 20%;
    text-align: center;
    border: 1px solid rgba($color: black, $alpha: 0.3);
}
</style>
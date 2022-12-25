<template>
    <table class="hints">
        <tr>
            <ScheduleLesson
                :lesson="{ name: 'Лекция', type: 'lecture' }"
                :splitted-lesson="emptySplittedLesson"
            ></ScheduleLesson>
            <ScheduleLesson
                :lesson="{ name: 'Лаба', type: 'lab' }"
                :splitted-lesson="emptySplittedLesson"
            ></ScheduleLesson>
            <ScheduleLesson
                :lesson="{ name: 'Семинар', type: 'sem' }"
                :splitted-lesson="emptySplittedLesson"
            ></ScheduleLesson>
            <ScheduleLesson
                :lesson="{ name: 'Окно', type: 'holiday' }"
                :splitted-lesson="emptySplittedLesson"
            ></ScheduleLesson>
            <ScheduleLesson
                :lesson="{ name: 'Сейчас', type: 'sem current-lesson' }"
                :splitted-lesson="emptySplittedLesson"
            ></ScheduleLesson>
        </tr>
    </table>
</template>

<script setup lang="ts">
import { LessonObject } from '@/interfaces/Lesson'
import ScheduleLesson from './scheduleLesson.vue'

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
<template>
    <table>
        <tr>
            <th class="time">Время</th>
            <th>Понедельник</th>
            <th>Вторник</th>
            <th>Среда</th>
            <th>Четверг</th>
            <th>Пятница</th>
            <th>Суббота</th>
        </tr>
        <tr v-for="i in 7">
            <td class="time">{{ time[i - 1] }}</td>
            <ScheduleLesson
                v-for="j in 6"
                lesson="lesson"
                type="holiday"
            ></ScheduleLesson>
        </tr>
    </table>
</template>

<script setup lang="ts">
import { LessonParsed } from '@/interfaces/Lesson'
import ScheduleLesson from './scheduleLesson.vue'

const props = defineProps<{
    week: LessonParsed[]
}>()

const time = [
    'Пара №1\n9:00-10:30',
    'Пара №2\n10:40-12:10',
    'Пара №3\n12:20-13:50\n12:50-14:20',
    'Пара №4\n14:30-16:00',
    'Пара №5\n16:10-17:40',
    'Пара №6\n18:20-19:50',
    'Пара №7\n20:00-21:30'
]
</script>

<style scoped lang="scss">
table {
    text-align: center;
}

th,
td,
.time {
    border: 1px solid rgba($color: black, $alpha: 0.3);
}

th {
    text-align: center;
    height: 50px !important;
    width: 15.5%;
    min-width: 95px;
}

.time {
    min-width: 60px;
    width: 7%;
    height: 110px;
    font-size: 9pt;
}
</style>
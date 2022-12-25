<template>
    <table>
        <tr>
            <th class="time">Время</th>
            <th
                v-for="i in 6"
                :class="checkCurrentDay(i)"
            > {{ days[i - 1] }} </th>
        </tr>
        <tr v-for="i in 7">
            <td class="time">{{ time[i - 1] }}</td>
            <ScheduleLesson
                v-for="j in 6"
                :lesson="chooseLesson(j, i)"
                :splittedLesson="chooseSplittedLesson(j, i)"
            ></ScheduleLesson>
        </tr>
    </table>
</template>

<script setup lang="ts">
import getLessonType from '@/helpers/getLessonType'
import { LessonObject, LessonParsed } from '@/interfaces/Lesson'
import ScheduleLesson from './scheduleLesson.vue'

const props = defineProps<{
    week: string,
    currentWeek: string,
    currentDay: number,
    schedule: LessonParsed[][],
}>()



const checkCurrentDay = (day: number) =>
    props.currentDay === day && props.currentWeek.includes(props.week) ? 'current-day' : ''

const chooseLesson = (i: number, j: number) => {
    const lessonObject: LessonObject = { name: '', type: 'holiday' }

    for (const lesson of props.schedule[0]) {
        if (lesson[0] === String(i) && lesson[2]?.split(' ')[0] === String(j)) {
            lessonObject.type = getLessonType(lesson[1] as string)
            lessonObject.name = createLessonName(lesson)
        }
    }

    return lessonObject
}


const chooseSplittedLesson = (i: number, j: number) => {
    const lessonObjects: [LessonObject, LessonObject] = [
        { name: '', type: 'holiday' },
        { name: '', type: 'holiday' }
    ]

    if ((chooseLesson(i, j).name) !== '')
        return lessonObjects

    for (const upLesson of props.schedule[1]) {
        if (upLesson[0] === String(i) && upLesson[2]?.split(' ')[0] === String(j)) {
            for (const downLesson of props.schedule[2]) {
                if (downLesson[0] === String(i) && downLesson[2]?.split(' ')[0] === String(j)) {
                    fillLesson(lessonObjects[0], upLesson)
                    fillLesson(lessonObjects[1], downLesson)
                    return lessonObjects
                }

            }
            fillLesson(lessonObjects[0], upLesson)
            return lessonObjects
        }
    }

    for (const downLesson of props.schedule[2]) {
        if (downLesson[0] === String(i) && downLesson[2]?.split(' ')[0] === String(j)) {
            fillLesson(lessonObjects[1], downLesson)
            return lessonObjects
        }
    }

    return lessonObjects
}

const removeLessonType = (lesson: string) => {
    const lessonTypes = [
        '[Лек]',
        '[Лаб]',
        '[Пр]'
    ]
    for (const lessonType of lessonTypes)
        lesson = lesson.replace(lessonType, '')
    return lesson.trim()
}


const createLessonName = (lesson: string[]) => removeLessonType(lesson[1]) + ' ' + lesson[3]

const fillLesson = (lessonObject: LessonObject, lesson: LessonParsed) => {
    lessonObject.name = createLessonName(lesson)
    lessonObject.type = getLessonType(lesson[1] as string)
}

const days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
]

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

    &.current-day {
        background: rgb(61, 140, 177);
        color: black;
    }
}

.time {
    min-width: 60px;
    width: 7%;
    height: 110px;
    font-size: 9pt;
}
</style>
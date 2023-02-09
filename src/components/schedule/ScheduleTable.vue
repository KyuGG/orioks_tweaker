<template>
    <table>
        <tr>
            <th class="time">Время</th>
            <th
                v-for="i in 6"
                :class="`${checkCurrentDay(i)} ${mobileHidden(i)}`"
            > {{ days[i - 1] }} </th>
        </tr>
        <tr v-for="i in 7">
            <td class="time">{{ timeCol[i - 1] }}</td>
            <ScheduleLesson
                v-for="j in 6"
                :lesson="chooseLesson(j, i)"
                :currentLesson="currentLesson(j, i)"
                :splittedLesson="chooseSplittedLesson(j, i)"
                :mobileHidden="mobileHidden(j)"
                :currentWeek="currentWeek"
            ></ScheduleLesson>
        </tr>
    </table>
</template>

<script setup lang="ts">
import { CurrentWeek } from '@/interfaces/CurrentWeek'
import { CurrentLesson, LessonObject, LessonParsed, MobileHidden } from '@/interfaces/Lesson'
import ScheduleLesson from './ScheduleLesson.vue'

const props = defineProps<{
    week: string,
    currentWeek: CurrentWeek,
    currentDay: number,
    currentChosenDay: number,
    schedule: LessonParsed[][],
}>()

/** @returns Класс, который необходимо выдать тегу th, чтобы показать текущий день */
const checkCurrentDay = (day: number) =>
    props.currentDay === day && props.currentWeek.includes(props.week) ? 'current-day' : ''

/** @returns Класс, который необходимо выдать всем тегам th и td, не относящимся к сегодняшнему дню (для скрытия в мобильном режиме) */
const mobileHidden = (day: number): MobileHidden =>
    props.currentChosenDay !== day ? 'mobile-hidden' : ''

/** @returns Объект дисциплины для передачи в компонент scheduleLesson */
const chooseLesson = (i: number, j: number) => {

    const lessonObject: LessonObject = { name: '', type: 'holiday' }

    for (const lesson of props.schedule[0])
        if (lesson[0] === String(i) && lesson[2]?.split(' ')[0] === String(j))
            fillLesson(lessonObject, lesson)

    return lessonObject
}

/** @returns 2 объекта дисциплины, требуется для случаев, когда нужно разбить
 *  пару на две, к примеру, по Ч1 и Ч2 и отобразить внутри одного блока */
const chooseSplittedLesson = (i: number, j: number) => {
    const lessonObjects: [LessonObject, LessonObject] = [
        { name: '', type: 'holiday' },
        { name: '', type: 'holiday' }
    ]

    // if ((chooseLesson(i, j).name) !== '')
    //     return lessonObjects

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

/** @returns Название пары без ее типа в конце ([Лек], [Пр], [Лаб]) */
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

/** @returns Название дисциплины в соответствии с предпочтениями пользователя (название берётся из localStorage.discNames)*/
const renameLesson = (lesson: string) => {
    const names = localStorage.getItem('discNames')
    let rename
    if (names) rename = JSON.parse(names)[lesson]
    return rename || lesson
}

/** @returns Новое имя дисциплины, содержащее только название и кабинет */
const createLessonName = (lesson: string[]) => renameLesson(removeLessonType(lesson[1])) + ' ' + lesson[3]

/** @returns Тип пары исходя из пометки в названии */
const getLessonType = (lesson: string) => {
    const type = lesson.split(' ')
    switch (type[type.length - 1]) {
        case '[Лек]':
            return 'lecture'

        case '[Лаб]':
            return 'lab'

        case '':
            return 'holiday'

        default:
            return 'sem'
    }
}

/** Заполняет объект дисциплины для передачи в компонент scheduleLesson */
const fillLesson = (lessonObject: LessonObject, lesson: LessonParsed) => {
    lessonObject.name = createLessonName(lesson)

    const type = getLessonType(lesson[1] as string)

    lessonObject.type = type
}

/** @returns Класс, который необходимо выдать тегу td, чтобы показать текущую пару */
const currentLesson = (day: number, lesson: number): CurrentLesson => {
    if (props.currentWeek.includes(props.week) &&
        props.currentDay === day) {

        const currentDate = new Date()
        const currentTime = currentDate.getTime()

        const [startHour, startMinutes] = timeLesson[lesson - 1][0].split(':').map((num: string) => Number(num))
        const [endHour, endMinutes] = timeLesson[lesson - 1][1].split(':').map((num: string) => Number(num))

        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour, startMinutes)
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHour, endMinutes)

        if (currentTime > startDate.getTime() &&
            currentTime < endDate.getTime()) {
            return 'current-lesson'
        }
    }
    return ''
}

const days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
]

const timeCol = [
    'Пара №1\n9:00-10:30',
    'Пара №2\n10:40-12:10',
    'Пара №3\n12:20-13:50\n12:50-14:20',
    'Пара №4\n14:30-16:00',
    'Пара №5\n16:10-17:40',
    'Пара №6\n18:20-19:50',
    'Пара №7\n20:00-21:30'
]

const timeLesson = [
    ['9:00', '10:30'],
    ['10:40', '12:10'],
    ['12:20', '14:20'],
    ['14:30', '16:00'],
    ['16:10', '17:40'],
    ['18:20', '19:50'],
    ['20:00', '21:30']
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


@media (max-width: 768px) {
    .mobile-hidden {
        display: none;
    }

    .time {
        width: .4%;
    }
}
</style>
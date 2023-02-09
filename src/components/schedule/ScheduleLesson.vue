<template>
    <td
        v-if="!splittedLesson[0].name && !splittedLesson[1].name"
        :class="`${lesson.type} ${currentLesson} ${mobileHidden}`"
    >
        {{ lesson.name }}
    </td>
    <td
        v-else
        :class="mobileHidden"
    >
        <div :class="currentSplittedLesson(0)"> {{ splittedLesson[0].name }} </div>
        <div :class="currentSplittedLesson(1)"> {{ splittedLesson[1].name }} </div>
    </td>
</template>

<script setup lang="ts">
import CurrentWeek from '@/interfaces/CurrentWeek'
import { LessonObject, CurrentLesson, MobileHidden } from '@/interfaces/Lesson'
const props = defineProps<{
    lesson: LessonObject,
    currentLesson: CurrentLesson,
    splittedLesson: [LessonObject, LessonObject],
    mobileHidden: MobileHidden,
    currentWeek: CurrentWeek
}>()

const currentSplittedLesson = (num: number) => {
    if (props.currentLesson.length) {
        if (num === 0) {
            if (props.currentWeek[2] === '1') return props.splittedLesson[0].type += ' current-lesson'
        }
        if (num === 1) {
            if (props.currentWeek[2] === '2') return props.splittedLesson[1].type += ' current-lesson'
        }
    }
    if (num === 0) return props.splittedLesson[0].type
    if (num === 1) return props.splittedLesson[1].type

}
</script>

<style scoped lang="scss">
td {
    height: 110px;
    font-size: 9pt;
    color: black;
    div {
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        &:first-child {
            border-bottom: 1px dashed rgba($color: #000000, $alpha: 0.3);
        }
    }
}

.lecture {
    background: #b6c6e7;
}

.lab {
    background: #fdd677;
}

.sem {
    background: white;
}

.holiday {
    background-color: #c5e0b5;
}

.current-lesson {
    border-radius: 7px;
    filter: drop-shadow(0px 0px 7px black);
    transform: scale(1.05);
    text-align: center;
}
</style>
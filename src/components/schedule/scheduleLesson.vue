<template>
    <td
        v-if="!splittedLesson[0].name && !splittedLesson[1].name"
        :class="`${lesson.type} ${mobileHidden}`"
    >
        {{ lesson.name }}
    </td>
    <td
        v-else
        :class="mobileHidden"
    >
        <div :class="splittedLesson[0].type"> {{ splittedLesson[0].name }} </div>
        <div :class="splittedLesson[1].type"> {{ splittedLesson[1].name }} </div>
    </td>
</template>

<script setup lang="ts">
import { LessonObject } from '@/interfaces/Lesson'
const props = defineProps<{
    lesson: LessonObject,
    splittedLesson: [LessonObject, LessonObject],
    mobileHidden: string
}>()
</script>

<style scoped lang="scss">
td {
    height: 110px;
    font-size: 9pt;

    div {
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

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
<template>
    <td
        v-if="!splittedLesson.length"
        :class="type"
    >
        {{ lesson }}
    </td>
    <td
        v-else
        :class="type"
    >
        <div :class="getLessonType(splittedLesson[0])"> {{ splittedLesson[0] }} </div>
        <div :class="getLessonType(splittedLesson[1])"> {{ splittedLesson[1] }} </div>
    </td>
</template>

<script setup lang="ts">
import getLessonType from '@/helpers/getLessonType'
import { LessonClassname } from '@/interfaces/Lesson'
const props = defineProps<{
    lesson: string,
    splittedLesson: [string, string] | ''
    type: LessonClassname
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
<template>
    <td :class="type">
        {{ lesson }}
    </td>
</template>

<script setup lang="ts">
import { LessonClassname } from '@/interfaces/Lesson'
const props = defineProps<{
    lesson: string,
    type: LessonClassname
}>()
</script>

<style scoped lang="scss">
td {
    height: 110px;
    font-size: 9pt;
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
</style>
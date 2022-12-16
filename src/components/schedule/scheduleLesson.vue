<template>
    <td :class="type">
        {{ lesson }}
    </td>
</template>

<script setup lang="ts">
import Lesson from '@/interfaces/Lesson'
const props = defineProps<{
    lesson: string,
    type: Lesson
}>()
</script>

<style scoped lang="scss">
td {
    height: 110px;
    font-size: 9pt;
}
</style>
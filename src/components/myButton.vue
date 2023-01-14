<template>
    <button
        class="my-btn"
        :value="value"
        @click="(payload: MouseEvent) => emit('click', payload)"
    >{{ placeholder }}</button>
</template>

<script setup lang="ts">
const props = defineProps<{
    placeholder: string,
    value: string
}>()

const emit = defineEmits<{
    (event: 'click', payload: MouseEvent): void
}>()
</script>
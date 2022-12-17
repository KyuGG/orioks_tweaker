<template>
    <button
        class="my-btn"
        @click="(payload: MouseEvent) => emit('click', payload)"
    >{{ placeholder }}</button>
</template>

<script setup lang="ts">
const props = defineProps<{
    placeholder: string
}>()

const emit = defineEmits<{
    (event: 'click', payload: MouseEvent): void
}>()
</script>

<style scoped lang="scss">
.my-btn {
    width: 160px;
    margin-right: 2px;
}
</style>
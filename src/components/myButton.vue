<template>
    <button
        class="my-btn"
        @click="emit('click')"
    >{{ placeholder }}</button>
</template>

<script setup lang="ts">
const props = defineProps<{
    placeholder: string
}>()

const emit = defineEmits<{
    (event: 'click'): void
}>()
</script>

<style scoped lang="scss">
.my-btn {
    width: 160px;
    margin-right: 2px;
}
</style>
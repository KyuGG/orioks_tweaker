<template>
    <div>
        <input
            type="checkbox"
            class="ios8-switch"
            :id="id"
            :checked="checked"
            @change="(payload: Event) => emit('update', payload, checked)"
        />
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string
    checked: boolean
    label: string
}>()

const emit = defineEmits<{
    (event: 'update', payload: Event, checked: boolean): void
}>()
</script>

<style scoped lang="scss">
.ios8-switch {
    position: absolute;
    margin: 8px 20 0 16px;
}

.ios8-switch+label {
    position: relative;
    padding: 5px 0 0 50px;
    line-height: 2em;
    cursor: pointer;
}

.ios8-switch+label:before {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 40px;
    height: 24px;
    border-radius: 16px;
    background: #1d1c1c;
    border: 1px solid #3b3b3b;
    transition: 0.3s;
}

.ios8-switch+label:after {
    content: '';
    position: absolute;
    display: block;
    left: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
    border-radius: 16px;
    background: #fff;
    border: 1px solid #d9d9d9b0;
    transition: 0.3s;
}

.ios8-switch+label:hover:after {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.ios8-switch:checked+label:after {
    margin-left: 16px;
}

.ios8-switch:checked+label:before {
    background: #5581d3;
}

label {
    color: white;
    transition: 0.3s;

    &:hover {
        color: #5581d3;
    }
}
</style>

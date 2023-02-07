
<template>
    <table>
        <tr>
            <td>
                <MyButton
                    placeholder="ПН"
                    value="1"
                    @click="(payload: MouseEvent) => emit('click', payload)"
                ></MyButton>
            </td>
            <td>
                <MyButton
                    placeholder="ВТ"
                    value="2"
                    @click="(payload: MouseEvent) => emit('click', payload)"
                ></MyButton>
            </td>
            <td>
                <MyButton
                    placeholder="СР"
                    value="3"
                    @click="(payload: MouseEvent) => emit('click', payload)"
                ></MyButton>
            </td>
            <td>
                <MyButton
                    placeholder="ЧТ"
                    value="4"
                    @click="(payload: MouseEvent) => emit('click', payload)"
                ></MyButton>
            </td>
            <td>
                <MyButton
                    placeholder="ПТ"
                    value="5"
                    @click="(payload: MouseEvent) => emit('click', payload)"
                ></MyButton>
            </td>
            <td>
                <MyButton
                    placeholder="СБ"
                    value="6"
                    @click="(payload: MouseEvent) => emit('click', payload)"
                ></MyButton>
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
import MyButton from '../MyButton.vue'

const emit = defineEmits<{
    (event: 'click', payload: MouseEvent): void
}>()

</script>

<style scoped lang="scss">
table {
    z-index: 3;
    position: sticky;
    bottom: 0;
    width: 100%;
}

td {
    width: 16.66%;

    button {
        width: 100%;
        height: 60px;
    }
}

@media (min-width: 768px) {
    table {
        display: none;
    }
}
</style>
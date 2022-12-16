<template>
    <div>
        <NavPanel name="Расписание"></NavPanel>
        <h3>Группа: {{ group }}</h3>
        <MyButton
            placeholder="Выбрать"
            @click="choose"
        ></MyButton>
        <MyButton
            placeholder="Подсказки"
            @click="hints"
        ></MyButton>
        <ScheduleHints></ScheduleHints>
        <ScheduleTable></ScheduleTable>
    </div>
</template>

<script setup lang="ts">
import MyButton from '../myButton.vue'
import NavPanel from '../navPanel.vue'
import ScheduleHints from './scheduleHints.vue'
import ScheduleTable from './scheduleTable.vue'

const group = 'GROUP'

const choose = () => console.log('choose')
const hints = () => console.log('hints')
</script>

<style scoped lang="scss">
h3 {
    margin-top: 10px;
    border: 1px solid #dddddd;
    padding: 5px;
}
</style>

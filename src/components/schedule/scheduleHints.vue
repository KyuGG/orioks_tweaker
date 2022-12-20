<template>
    <table class="hints hints-active">
        <tr>
            <ScheduleLesson
                type="lecture"
                lesson="Лекция"
            ></ScheduleLesson>
            <ScheduleLesson
                type="lab"
                lesson="Лаба"
            ></ScheduleLesson>
            <ScheduleLesson
                type="sem"
                lesson="Семинар"
            ></ScheduleLesson>
            <ScheduleLesson
                type="holiday"
                lesson="Окно"
            ></ScheduleLesson>
            <ScheduleLesson
                type="sem"
                lesson="Сейчас"
            ></ScheduleLesson>
        </tr>
    </table>
</template>

<script setup lang="ts">
import ScheduleLesson from './scheduleLesson.vue'


</script>

<style scoped lang="scss">
table {
    width: 100%;
    margin: 10px 0;
    transition: .3s;
    opacity: 0;

    &.hints-active {
        opacity: 100%;
    }
}

td {
    height: 50px;
    width: 20%;
    text-align: center;
    border: 1px solid rgba($color: black, $alpha: 0.3);
}
</style>
<template>
    <table class="hints">
        <tr>
            <ScheduleLesson
                type="lecture"
                lesson="Лекция"
                splitted-lesson=""
                week=""
                day=""
            ></ScheduleLesson>
            <ScheduleLesson
                type="lab"
                lesson="Лаба"
                splitted-lesson=""
                week=""
                day=""
            ></ScheduleLesson>
            <ScheduleLesson
                type="sem"
                lesson="Семинар"
                splitted-lesson=""
                week=""
                day=""
            ></ScheduleLesson>
            <ScheduleLesson
                type="holiday"
                lesson="Окно"
                splitted-lesson=""
                week=""
                day=""
            ></ScheduleLesson>
            <ScheduleLesson
                type="sem current-lesson"
                lesson="Сейчас"
                splitted-lesson=""
                week=""
                day=""
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
}

td {
    height: 50px;
    width: 20%;
    text-align: center;
    border: 1px solid rgba($color: black, $alpha: 0.3);
}
</style>
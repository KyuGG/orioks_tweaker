import { createApp } from 'vue'
import Schedule from '@/components/schedule/SchedulePage1.vue'
import ScheduleNavButton from '@/components/schedule/ScheduleNavButton1.vue'
import vueToDom from '@/helpers/vueToDom'

/** Встраивает vue компонент c расписанием на отдельную страницу сайта */
export default function schedule() {
    const scheduleNavButton = vueToDom(ScheduleNavButton)
    document.querySelector('.nav')?.children[1].after(scheduleNavButton)

    if (location.pathname === '/schedule')
        createApp(Schedule).mount('.container.margin-top')
}

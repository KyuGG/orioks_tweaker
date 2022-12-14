import { createApp } from 'vue'
import Schedule from '@/components/schedule/schedulePage.vue'
import ScheduleNavButton from '@/components/schedule/scheduleNavButton.vue'
import vueToDom from '@/helpers/vueToDom'

/**
 * @summary Встраивает vue компонент c расписанием на отдельную страницу сайта
 */
export default function schedule() {
    const scheduleNavButton = vueToDom(ScheduleNavButton)
    document.querySelector('.nav')?.children[1].after(scheduleNavButton)

    if (location.pathname === '/schedule')
        createApp(Schedule).mount('.container.margin-top')
}

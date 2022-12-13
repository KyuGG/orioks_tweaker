import { createApp } from 'vue'
import App from '@/components/schedule.vue'
import vnodeToDom from '@/helpers/vnodeToDom'

/**
 * @summary Встраивает vue компонент на отдельную страницу сайта с возможностью багрепорта
 */
export default function schedule() {

    const scheduleButton = vnodeToDom(
        <li>
            <a href="/schedule">Расписание</a>
        </li>
    )

    document.querySelector('.nav')?.children[1].after(scheduleButton)


    if (location.pathname === '/schedule')
        createApp(App).mount('.container.margin-top')
}

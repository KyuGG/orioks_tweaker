import { createApp } from 'vue'
import App from '@/components/bugReport.vue'

/**
 * @summary Встраивает vue компонент на отдельную страницу сайта с возможностью багрепорта
 */
export default function bugReport() {
    if (location.pathname === '/bugreport')
        createApp(App).mount('.container.margin-top')
}

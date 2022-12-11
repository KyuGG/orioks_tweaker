import { createApp } from 'vue'
import App from '@/components/bugReport.vue'

export default function bugReport() {
    if (location.pathname === '/bugreport')
        createApp(App).mount('.container.margin-top')
}

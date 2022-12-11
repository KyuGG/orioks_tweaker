import { createApp } from 'vue'
import App from '../components/bugReport.vue'

export default function bugReport() {
    createApp(App).mount('.container.margin-top')
}

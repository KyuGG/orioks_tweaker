import { createApp } from 'vue'
import App from '../view/test.vue'

const renderTest = () => {
    createApp(App).mount('.container.margin-top')
}

export default renderTest

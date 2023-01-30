import vueToDom from '@/helpers/vueToDom'
import ScheduleFetch from '@/components/schedule/ScheduleFetch.vue'

window.onload = () => {
    const scheduleFetch = vueToDom(ScheduleFetch)

    document.querySelector('.day')?.after(scheduleFetch)
}



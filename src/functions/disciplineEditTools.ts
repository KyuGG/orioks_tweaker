import vueToDom from '@/helpers/vueToDom'
import nullChangesVue from '@/components/disciplineEditTools/nullChanges.vue'
import editNameVue from '@/components/disciplineEditTools/editName.vue'

/**Подгружает инструментарий для изменения названия дисциплин */
export default function disciplineEditTools() {
    if (location.pathname !== '/student/student') return
    addNullButton()
    addEditButtons()
}

/**Загружает на страницу кнопку сброса изменений */
function addNullButton() {
    const clearSettings = vueToDom(nullChangesVue)
    const table = document.querySelector('table')
    if (table) table.before(clearSettings)
}

/**Загружает на страницу "маркеры" для редактирования названия дисциплин */
function addEditButtons() {
    const dises = document.querySelectorAll('tr.pointer')
    dises.forEach(disc => {
        const td = disc.querySelector(':first-child')
        const marker = vueToDom(editNameVue)
        if (td) td.prepend(marker)
    })
}

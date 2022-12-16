import vueToDom from '@/helpers/vueToDom'
import NullChanges from '@/components/disciplineEditTools/nullChanges.vue'
import EditName from '@/components/disciplineEditTools/editName.vue'

/**Подгружает инструментарий для изменения названия дисциплин */
export default function disciplineEditTools() {
    if (location.pathname !== '/student/student') return
    addNullButton()
    addEditButtons()
}

/**Загружает на страницу кнопку сброса изменений */
function addNullButton() {
    const clearSettings = vueToDom(NullChanges)
    const table = document.querySelector('table')
    if (table) table.before(clearSettings)
}

/**Загружает на страницу "маркеры" для редактирования названия дисциплин */
function addEditButtons() {
    const dises = document.querySelectorAll('tr.pointer')
    dises.forEach(disc => {
        const td = disc.querySelector(':first-child')
        const marker = vueToDom(EditName)
        if (td) td.prepend(marker)
    })
}

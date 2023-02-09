import vueToDom from '@/helpers/vueToDom'
import NullChanges from '@/components/disciplineEditTools/NullChanges.vue'
import EditName from '@/components/disciplineEditTools/EditName.vue'

/**Подгружает инструментарий для изменения названия дисциплин */
export default function disciplineEditTools(darkTheme: boolean) {
    if (location.pathname !== '/student/student') return
    addNullButton()
    addEditButtons(darkTheme)
}

/**Загружает на страницу кнопку сброса изменений */
function addNullButton() {
    const clearSettings = vueToDom(NullChanges)
    const table = document.querySelector('table')
    if (table) table.before(clearSettings)
}

/**Загружает на страницу "маркеры" для редактирования названия дисциплин */
function addEditButtons(darkTheme: boolean) {
    const dises = document.querySelectorAll('tr.pointer')
    dises.forEach(disc => {
        const td = disc.querySelector(':first-child')
        const marker = vueToDom(EditName, { darkTheme: darkTheme })
        if (td) td.prepend(marker)
    })
}

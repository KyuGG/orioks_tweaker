/**Константа всех теоретических названий дисциплины по физической культуре*/
const PHYS_NAMES = [
    'Физическая культура',
    'Физическая культура и спорт',
    'Практическая физическая культура и спорт (индивидуальные виды спорта)',
    'Практическая физическая культура и спорт (командные виды спорта)',
    'Индивидуальные виды спорта',
    'Командные виды спорта',
    'Индивидуальные виды спорта / Командные виды спорта',
]

/**Константа, в которой записаны все селекторы, по которым необходимо обращаться для смены названий дисциплин*/
const SELECTORS: Record<string, string> = {
    '/portfolio/view-project': 'div.ng-binding .ng-scope',
    '/student/student':
        'tr.pointer td:nth-child(2), div.table tr td:last-child span:first-child',
    '/student/homework/list': 'tr td:nth-child(4)',
    '/portfolio/list-uchebnie-project':
        'tr[class*=project]:nth-child(2n-1) td:nth-child(3)',
    '/portfolio/list-uchebnie-project/index':
        'tr[class*=project]:nth-child(2n-1) td:nth-child(3)',
    '/student/homework/create': 'select#homework-discipline-field option',
}

/**Производит замену названий дисциплин */
export default function disciplineNames() {
    prevNamer()
    document.querySelectorAll('.bad').forEach(el => el.remove())
    updateNames()
}

/**Добавляет оригинальные имена дисциплин в качестве атрибута элемента. Использовать при инициализации. */
function prevNamer() {
    const dises = document.querySelectorAll(SELECTORS['/student/student'])
    dises.forEach(disc => {
        const name = disc.textContent as string
        disc.setAttribute('prevname', name)
    })
}

/**
 * Проверяет имя на соответствие
 * @param name проверяемое имя
 * @returns -1 если поле пустое; 1 если длина имени слишком большая; 0 если всё хорошо.
 */
export function checkName(name: string | null) {
    if (!name) return -1
    else if (checkNameLength(name)) return 1
    return 0
}

/**
 * Проверяет длину имени
 * @param name имя
 * @param length максимальная длина, после достижения которой, функция заявит о слишком большом размере
 * @returns true, если длина подходящая, false если длина слишком большая
 */
export function checkNameLength(name: string, length = 14) {
    const nameArr = name.split(' ')
    for (const word of nameArr) {
        if (word.length > length) return true
    }
    return false
}

/**Проверяет наличие названия дисциплины в константе дисциплин по физкультуре */
function isPhysicalEducation(name: string) {
    for (const physName of PHYS_NAMES) {
        if (physName === name) return true
    }
    return false
}

/**Обновляет все названия предметов на те, что заданы в localStorage*/
export function updateNames() {
    let usePrevname = false

    if (location.pathname === '/student/news/view') return newsView()
    if (location.pathname === '/student/student') usePrevname = true

    const selector = SELECTORS[location.pathname]
    if (!selector) return
    const dises = document.querySelectorAll(selector)

    const newNames = getNewNames()
    dises.forEach(disc => {
        let name
        if (usePrevname) name = disc.getAttribute('prevname')
        else name = disc.textContent
        if (!name) return
        name = name.trim()
        for (const n in newNames)
            if (name.includes(n))
                disc.textContent = name.replace(n, newNames[n] + '\n')
    })
}

/**Обновляет названия в новостях */
function newsView() {
    const disc = document.querySelector('strong')
    if (!disc) return
    const name = disc.textContent
    if (!name) return
    const newNames = getNewNames()

    for (const n in newNames)
        if (name.includes(n)) disc.textContent = name.replace(n, newNames[n])
}

/**Возвращает изменённые имена дисциплин */
export function getNewNames(): Record<string, string> {
    const json = localStorage.getItem('discNames')
    if (json) return JSON.parse(json)
    return {}
}

/**Сохраняет имя дисциплины в localstorage
 * @param oldName оригинальное название дисциплины
 * @param newName пользовательское название дисциплины
 */
export function setName(oldName: string, newName: string) {
    const names = getNewNames()
    if (isPhysicalEducation(oldName))
        for (let name of PHYS_NAMES) names[name] = newName
    else names[oldName] = newName
    localStorage.setItem('discNames', JSON.stringify(names))

    updateNames()
}

/**Очищает localstorage с именами дисциплин */
export function resetNames() {
    localStorage.removeItem('discNames')
    revertChanges()
}

/**Вспомогательная функция, которая ставит prevname в качестве имени дисциплины */
function revertChanges() {
    if (location.pathname !== '/student/student') return

    const dises: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        SELECTORS['/student/student']
    )

    dises.forEach(disc => {
        const prevName = disc.getAttribute('prevname')
        if (prevName) disc.innerText = prevName + '\n'
    })
}

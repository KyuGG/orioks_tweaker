function discNameChanger() {
    if (!(location.pathname == '/student/student'))
        return

    if (!localStorage.getItem('discNames'))
        localStorage.setItem('discNames', '{}')

    document.querySelectorAll('.bad').forEach(el => el.remove())
    const clearSettings = document.createElement('input')
    clearSettings.type = 'button'
    clearSettings.value = 'Обнулить изменения'
    clearSettings.classList.add('my-btn')
    document.querySelector('table').before(clearSettings)
    clearSettings.onclick = () => {
        localStorage.removeItem('discNames')
        alert('Все изменения сброшены')
        location.reload()
    }
    const dises = document.querySelectorAll('tr.pointer')
    dises.forEach(disc => {
        const td = disc.querySelector(':first-child')
        const button = document.createElement('input')
        button.type = 'image'
        button.src = chrome.runtime.getURL('images/marker.png')
        button.classList.add('invert-img')
        td.prepend(button)
        button.onclick = evt => {
            evt.stopPropagation()
            let newName = prompt('Новое название дисциплины')
            if (!newName) {
                if (newName != null)
                    alert('Название не может быть пустым')
                return
            }
            newName = newName.trim()
            if (checkNameLength(newName))
                alert('Слова в названии дисциплины слишком длинные.\nРасширение не гарантирует корректность работы в таком случае')
            const prevName = disc.querySelector(':nth-child(2)').getAttribute('prevname')
            let discNames = JSON.parse(localStorage.getItem('discNames'))
            if (isPhysicalEducation(prevName)) {
                discNames['Физическая культура'] = newName
                discNames['Физическая культура и спорт'] = newName
                discNames['Практическая физическая культура и спорт (индивидуальные виды спорта)'] = newName
                discNames['Практическая физическая культура и спорт (командные виды спорта)'] = newName
            }
            else
                discNames[prevName] = newName
            disc.querySelector(':nth-child(2)').textContent = newName
            discNames = JSON.stringify(discNames)
            localStorage.setItem('discNames', discNames)
        }
    })
}

function discNameLoader() {
    if (location.pathname == '/student/student')
        document.querySelectorAll('tr.pointer td:nth-child(2)').forEach(td => td.setAttribute('prevname', td.textContent))

    if (!(localStorage.discNames != '{}'))
        return

    let selector = ''
    switch (location.pathname) {
        case '/student/news/view':
            const disc = document.querySelector('strong')
            const newsNewNames = JSON.parse(localStorage.getItem('discNames'))
            const name = disc.textContent
            for (const n in newsNewNames)
                if (name.includes(n))
                    disc.innerText = name.replace(n, newsNewNames[n])
            break

        case '/portfolio/view-project':
            selector = 'div.ng-binding .ng-scope'
            break

        case '/student/student':
            selector = 'tr.pointer td:nth-child(2), div.table tr td:last-child span:first-child'
            break

        case '/student/homework/list':
            selector = 'tr td:nth-child(4)'
            break

        case '/portfolio/list-uchebnie-project':
        case '/portfolio/list-uchebnie-project/index':
            selector = 'tr[class*=project]:nth-child(2n-1) td:nth-child(3)'
            break

        case '/student/homework/create':
            selector = 'select#homework-discipline-field option'
            break
        case '/schedule':
            selector = '.schedule-td:not(:first-child, .includes-div), .includes-div *:not(br)'
    }
    if (!selector)
        return
    const dises = document.querySelectorAll(selector)
    const newNames = JSON.parse(localStorage.getItem('discNames'))
    for (const disc of dises) {
        const name = disc.textContent.trim()
        for (const n in newNames) {
            if (name.includes(n))
                disc.innerText = name.replace(n, newNames[n] + '\n')
        }
    }
}

function checkNameLength(name) {
    const nameArr = name.split(' ')
    for (const word of nameArr) {
        if (word.length > 14)
            return true
    }
    return false
}

function isPhysicalEducation(name) {
    if (name == 'Физическая культура и спорт' || name == 'Практическая физическая культура и спорт (индивидуальные виды спорта)' || name == 'Практическая физическая культура и спорт (командные виды спорта)')
        return true
    return false
}
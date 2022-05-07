function discNameChanger() {
    if (location.pathname == '/student/student') {
        if (!localStorage.getItem('discNames')) {
            localStorage.setItem('discNames', '{}')
        }
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
            button.onclick = () => {
                const newName = prompt('Новое название дисциплины')
                if (newName) {
                    const prevName = disc.querySelector(':nth-child(2)').getAttribute('prevname')
                    let discNames = JSON.parse(localStorage.getItem('discNames'))
                    discNames[prevName] = newName.trim()
                    disc.querySelector(':nth-child(2)').textContent = discNames[prevName]
                    discNames = JSON.stringify(discNames)
                    localStorage.setItem('discNames', discNames)
                }
                else {
                    alert('Название не может быть пустым')
                }
            }
        })
    }
}

function discNameLoader() {
    if (location.pathname == '/student/student')
        document.querySelectorAll('tr.pointer td:nth-child(2)').forEach(td => td.setAttribute('prevname', td.textContent))
    if (localStorage.discNames != '{}') {
        let selector = ''
        switch (location.pathname) {
            case '/student/news/view':
                const disc = document.querySelector('strong')
                const newsNewNames = JSON.parse(localStorage.getItem('discNames'))
                const name = disc.textContent
                for (const n in newsNewNames) {
                    if (name == n) {
                        disc.textContent = newsNewNames[n]
                    }
                }
                break

            case '/portfolio/view-project':
                selector = 'div.ng-binding .ng-scope'
                break

            case '/student/student':
                selector = 'tr.pointer td:nth-child(2)'
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
        }
        if (selector) {
            const dises = document.querySelectorAll(selector)
            const newNames = JSON.parse(localStorage.getItem('discNames'))
            for (const disc of dises) {
                const name = disc.textContent.trim()
                for (const n in newNames) {
                    if (name == n) {
                        disc.textContent = newNames[n]
                    }
                }
            }
        }
    }
}
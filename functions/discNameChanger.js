function discNameChanger() {
    if (location.pathname == '/student/student') {
        if (!localStorage.getItem('discNames')) {
            localStorage.setItem('discNames', '{}')
        }
        document.querySelectorAll('.bad').forEach(el => el.remove())
        let clearSettings = document.createElement('input')
        clearSettings.type = 'button'
        clearSettings.value = 'Обнулить изменения'
        document.querySelector('table').before(clearSettings)
        clearSettings.onclick = () => {
            localStorage.removeItem('discNames')
            alert('Все изменения сброшены')
            location.reload()
        }
        let dises = document.querySelectorAll('tr.pointer')
        dises.forEach(disc => {
            let td = disc.querySelector(':first-child')
            let button = document.createElement('input')
            button.type = 'image'
            button.src = 'https://cdn-icons-png.flaticon.com/512/4277/4277132.png'
            button.width = 17
            td.prepend(button)
            button.onclick = () => {
                let newName = prompt('Новое название дисциплины').trim()
                if (newName) {
                    let prevName = disc.querySelector(':nth-child(2)').getAttribute('prevname')
                    let discNames = JSON.parse(localStorage.getItem('discNames'))
                    discNames[prevName] = newName
                    disc.querySelector(':nth-child(2)').textContent = newName
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
    if (location.pathname == '/student/student') {
        document.querySelectorAll('tr.pointer td:nth-child(2)').forEach(td => td.setAttribute('prevname', td.innerHTML))
        document.querySelectorAll('tr.pointer td:last-child').forEach(td => td.style = 'text-align: right')
        document.querySelectorAll('tr.pointer span').forEach(span => span.style = 'margin-right: 15px')
    }
    if (localStorage.discNames != '{}') {
        let selector = ''
        switch (location.pathname) {
            case '/student/news/view':
                var disc = document.querySelector('strong')
                var newNames = JSON.parse(localStorage.getItem('discNames'))
                let name = disc.textContent
                for (let n in newNames) {
                    if (name == n) {
                        disc.textContent = newNames[n]
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
                break
        }
        if (selector) {
            var dises = document.querySelectorAll(selector)
            var newNames = JSON.parse(localStorage.getItem('discNames'))
            for (let disc of dises) {
                let name = disc.textContent.trim()
                for (let n in newNames) {
                    if (name == n) {
                        disc.textContent = newNames[n]
                    }
                }
            }
        }
    }
}
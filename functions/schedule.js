async function schedule() {
    const nav = document.querySelector('.navbar-nav')
    const scheduleButton = document.createElement('li')
    const scheduleButtonLink = document.createElement('a')
    scheduleButtonLink.textContent = 'Расписание'
    scheduleButtonLink.href = '/schedule'
    scheduleButton.append(scheduleButtonLink)
    nav.children[1].after(scheduleButton)
    setRules({ 'https://orioks.miet.ru/libs/bootstrap/bootstrap.min.css?v=1571396836': [1069] }, 'padding', '10px 14px')

    if (location.pathname == '/schedule') {
        const content = document.querySelector('.row')
        document.querySelectorAll('.col-md-6').forEach(block => block.remove())
        const scheduleHeader = document.createElement('div')
        const scheduleH2 = document.createElement('h3')
        const scheduleBtn = document.createElement('button')
        const scheduleSave = document.createElement('button')
        const scheduleHints = document.createElement('div')
        const scheduleHintsTable = document.createElement('table')
        const scheduleHintsTr = document.createElement('tr')
        const scheduleCh = document.createElement('h3')
        const scheduleZn = document.createElement('h3')

        scheduleH2.textContent = 'Группа:'
        scheduleBtn.textContent = 'Выбрать'
        scheduleSave.textContent = 'Сделать по умолчанию'
        scheduleBtn.classList.add('my-btn')
        scheduleSave.classList.add('my-btn')
        scheduleHeader.classList.add('.col-md-6')
        scheduleCh.textContent = 'Числитель'
        scheduleZn.textContent = 'Знаменатель'
        scheduleHeader.append(scheduleH2, scheduleBtn, scheduleSave)

        scheduleHintsTable.classList.add('hints')
        const scheduleHintsTd1 = document.createElement('td')
        scheduleHintsTd1.textContent = 'Лекция'
        scheduleHintsTd1.classList.add('lecture')
        const scheduleHintsTd2 = document.createElement('td')
        scheduleHintsTd2.textContent = 'Лабораторная работа'
        scheduleHintsTd2.classList.add('lab')
        const scheduleHintsTd3 = document.createElement('td')
        scheduleHintsTd3.textContent = 'Семинар'
        scheduleHintsTd3.classList.add('sem')
        const scheduleHintsTd4 = document.createElement('td')
        scheduleHintsTd4.textContent = 'Окно'
        scheduleHintsTd4.classList.add('holiday')
        scheduleHintsTr.append(scheduleHintsTd1, scheduleHintsTd2, scheduleHintsTd3, scheduleHintsTd4)
        scheduleHintsTable.append(scheduleHintsTr)
        scheduleHints.append(scheduleHintsTable)

        content.append(scheduleHeader, scheduleHints, scheduleCh)

        const tableCh = document.createElement('table')
        const trCh = document.createElement('tr')
        tableCh.classList.add('schedule')
        tableCh.classList.add('ch')
        const ths = window.innerWidth > 767 ? ['Время', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] : ['Время', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
        for (let i = 0; i < 7; i++) {
            const th = document.createElement('th')
            th.textContent = ths[i]
            trCh.append(th)
        }
        tableCh.append(trCh)
        content.append(tableCh, scheduleZn)

        for (let i = 0; i < 7; i++) {
            const tr = document.createElement('tr')
            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td')
                td.classList.add(`schedule-${i}-${j}`)
                td.classList.add('schedule-td')
                tr.append(td)
            }
            tableCh.append(tr)
        }

        const tableZn = document.createElement('table')
        const trZn = document.createElement('tr')
        tableZn.classList.add('schedule')
        tableZn.classList.add('zn')
        for (let i = 0; i < 7; i++) {
            const th = document.createElement('th')
            th.textContent = ths[i]
            trZn.append(th)
        }
        tableZn.append(trZn)
        content.append(tableZn)

        for (let i = 0; i < 7; i++) {
            const tr = document.createElement('tr')
            for (let j = 0; j < 7; j++) {
                const td = document.createElement('td')
                td.classList.add(`schedule-${i}-${j}`)
                td.classList.add('schedule-td')
                tr.append(td)
            }
            tableZn.append(tr)
        }

        const time = [
            'Пара №1\n9:00-10:30',
            'Пара №2\n10:40-12:10',
            'Пара №3\n12:20-13:50\n12:50-14:20',
            'Пара №4\n14:30-16:00',
            'Пара №5\n16:10-17:40',
            'Пара №6\n18:20-19:50',
            'Пара №7\n20:00-21:30'
        ]
        const tdsFirst = document.querySelectorAll('.schedule tr :first-child:not(th)')
        for (const i in time) {
            tdsFirst[i].innerText = time[i]
            tdsFirst[7 + Number(i)].innerText = time[i]
        }

        const localStorageGroup = localStorage.getItem('group')
        if (localStorageGroup) {
            loadSchedule(localStorageGroup)
        }

        scheduleSave.onclick = () => {
            const group = prompt('Введите вашу группу\nНапример: П-22')
            if (group) {
                localStorage.setItem('group', group.trim())
                location.reload()
            }
            else {
                alert('Название не может быть пустым')
            }
        }

        scheduleBtn.onclick = () => {
            const group = prompt('Введите вашу группу\nНапример: П-22')
            loadSchedule(group)
        }
    }
}

async function loadSchedule(group) {
    if (group) {
        document.querySelector('.row h3').textContent = 'Загрузка...'
        const schedule = await fetchSchedule(group.trim())
        document.querySelectorAll('.schedule td:not(:first-child)').forEach(child => {
            child.textContent = ''
            child.classList.add('holiday')
            child.classList.remove('lecture')
            child.classList.remove('lab')
            child.classList.remove('sem')
        })

        //числитель
        for (const ch of schedule[0]) {
            const week = document.querySelector(`.ch .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)
            week.innerText = withoutLessonType(ch[1]) + '\n' + ch[3]
            colorizeTable(week, ch[1])
        }
        //знаменатель
        for (const ch of schedule[3]) {
            const week = document.querySelector(`.zn .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)
            week.innerText = withoutLessonType(ch[1]) + '\n' + ch[3]
            colorizeTable(week, ch[1])
        }
        //первый числитель
        for (const ch of schedule[1]) {
            const td = document.querySelector(`.ch .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)
            if (td.children.length == 0) {
                td.append(document.createElement('div'))
                td.append(document.createElement('div'))
            }
            td.children[0].innerText = withoutLessonType(ch[1]) + ' ' + ch[3]
            colorizeTable(td.children[0], ch[1])
        }
        //второй числитель
        for (const ch of schedule[2]) {
            const td = document.querySelector(`.ch .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)

            if (td.children.length == 0)
                td.append(document.createElement('div'))
            if (td.children.length == 1)
                td.append(document.createElement('div'))

            td.children[1].innerText = withoutLessonType(ch[1]) + ' ' + ch[3]
            colorizeTable(td.children[1], ch[1])
        }
        //первый знаменатель
        for (const ch of schedule[4]) {
            const td = document.querySelector(`.zn .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)
            if (td.children.length == 0) {
                td.append(document.createElement('div'))
                td.append(document.createElement('div'))
            }
            td.children[0].innerText = withoutLessonType(ch[1]) + ' ' + ch[3]
            colorizeTable(td.children[0], ch[1])
        }
        //второй знаменатель
        for (const ch of schedule[5]) {
            const td = document.querySelector(`.zn .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)

            if (td.children.length == 0)
                td.append(document.createElement('div'))
            if (td.children.length == 1)
                td.append(document.createElement('div'))

            td.children[1].innerText = withoutLessonType(ch[1]) + ' ' + ch[3]
            colorizeTable(td.children[1], ch[1])
        }

        document.querySelector('.row h3').textContent = `Группа: ${group.toUpperCase()}`
    }
}

function withoutLessonType(name) {
    const n = name.split(' ')
    if (n[n.length - 1] == '[Пр]' || n[n.length - 1] == '[Лек]' || n[n.length - 1] == '[Лаб]')
        n.pop()
    return n.join(' ')
}

function colorizeTable(block, name) {
    const type = name.split(' ')
    switch (type[type.length - 1]) {
        case '[Лек]':
            block.classList.add('lecture')
            break
        case '[Лаб]':
            block.classList.add('lab')
            break
        default:
            if (block.textContent != '')
                block.classList.add('sem')
    }
}

async function fetchSchedule(group) {
    const scheduleAPI = `https://miet.ru/schedule/data?group=${group}`
    const schedule = await (await fetch(scheduleAPI)).json()
    if (schedule.Data) {
        const identifyWeek = {
            0: 'ch1',
            1: 'zn1',
            2: 'ch2',
            3: 'zn2'
        }
        const simpleSchedule = schedule.Data.map(el => [el.Day, el.Class.Name, el.Time.Time, el.Room.Name, identifyWeek[el.DayNumber]])
        let ch1 = []
        let zn1 = []
        let ch2 = []
        let zn2 = []

        for (const el of simpleSchedule) {
            switch (el.pop()) {
                case 'ch1':
                    ch1.push(el.join('|'))
                    break
                case 'ch2':
                    ch2.push(el.join('|'))
                    break
                case 'zn1':
                    zn1.push(el.join('|'))
                    break
                case 'zn2':
                    zn2.push(el.join('|'))
            }
        }

        let ch = []
        let zn = []
        let ch1Indexes = []
        let ch2Indexes = []
        let zn1Indexes = []
        let zn2Indexes = []

        for (const item in ch1) {
            for (const segment in ch2) {
                if (ch1[item] == ch2[segment]) {
                    ch.push(ch1[item])
                    ch1Indexes.push(Number(item))
                    ch2Indexes.push(Number(segment))
                }
            }
        }

        for (const item in zn1) {
            for (const segment in zn2) {
                if (zn1[item] == zn2[segment]) {
                    zn.push(zn1[item])
                    zn1Indexes.push(Number(item))
                    zn2Indexes.push(Number(segment))
                }
            }
        }

        ch1Indexes = ch1Indexes.sort((a, b) => b - a)
        ch2Indexes = ch2Indexes.sort((a, b) => b - a)
        zn1Indexes = zn1Indexes.sort((a, b) => b - a)
        zn2Indexes = zn2Indexes.sort((a, b) => b - a)

        for (const i of ch1Indexes) {
            ch1.splice(i, 1)
        }

        for (const i of ch2Indexes) {
            ch2.splice(i, 1)
        }

        for (const i of zn1Indexes) {
            zn1.splice(i, 1)
        }

        for (const i of zn2Indexes) {
            zn2.splice(i, 1)
        }

        ch = ch.map(el => el = el.split('|'))
        ch1 = ch1.map(el => el = el.split('|'))
        ch2 = ch2.map(el => el = el.split('|'))
        zn = zn.map(el => el = el.split('|'))
        zn1 = zn1.map(el => el = el.split('|'))
        zn2 = zn2.map(el => el = el.split('|'))

        const parsedSchedule = [ch, ch1, ch2, zn, zn1, zn2]

        return parsedSchedule
    }
}
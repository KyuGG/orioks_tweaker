async function schedule() {
    if (!(location.pathname === '/schedule'))
        return

    preparePage('Расписание')

    const content = document.querySelector('.row')
    const scheduleHeader = document.createElement('div')
    const scheduleH2 = document.createElement('h3')
    const scheduleBtn = document.createElement('button')
    const HintsBtn = document.createElement('button')
    const scheduleHintsTable = document.createElement('table')
    const scheduleHintsTr = document.createElement('tr')
    const scheduleCh = document.createElement('h3')
    const scheduleZn = document.createElement('h3')

    scheduleH2.textContent = 'Группа:'
    scheduleBtn.textContent = 'Выбрать'
    scheduleBtn.classList.add('my-btn')
    HintsBtn.textContent = 'Подсказки'
    HintsBtn.classList.add('my-btn')
    scheduleHeader.classList.add('.col-md-6')
    scheduleCh.textContent = 'Числитель'
    scheduleZn.textContent = 'Знаменатель'
    scheduleHeader.append(scheduleH2, scheduleBtn, HintsBtn)

    const scheduleContents = document.createElement('div')
    scheduleContents.classList.add('schedule-contents')

    scheduleHintsTable.classList.add('hints')
    const scheduleHintsTd1 = document.createElement('td')
    scheduleHintsTd1.textContent = 'Лекция'
    scheduleHintsTd1.classList.add('lecture')
    const scheduleHintsTd2 = document.createElement('td')
    scheduleHintsTd2.textContent = 'Лаба'
    scheduleHintsTd2.classList.add('lab')
    const scheduleHintsTd3 = document.createElement('td')
    scheduleHintsTd3.textContent = 'Семинар'
    scheduleHintsTd3.classList.add('sem')
    const scheduleHintsTd4 = document.createElement('td')
    scheduleHintsTd4.textContent = 'Окно'
    scheduleHintsTd4.classList.add('holiday')
    const scheduleHintsTd5 = document.createElement('td')
    scheduleHintsTd5.textContent = 'Сейчас'
    scheduleHintsTd5.classList.add('current-lesson')
    scheduleHintsTr.append(scheduleHintsTd1, scheduleHintsTd2, scheduleHintsTd3, scheduleHintsTd4, scheduleHintsTd5)
    scheduleHintsTable.append(scheduleHintsTr)

    content.append(scheduleHeader, scheduleHintsTable)

    const tableCh = document.createElement('table')
    const trCh = document.createElement('tr')
    tableCh.classList.add('schedule')
    tableCh.classList.add('ch')
    const ths = ['Время', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    for (let i = 0; i < 7; i++) {
        const th = document.createElement('th')
        th.textContent = ths[i]
        trCh.append(th)
    }
    tableCh.append(trCh)

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

    scheduleContents.append(scheduleCh, tableCh, scheduleZn, tableZn)
    content.append(scheduleContents)

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

    mobileSchedule()
    await loadSchedule()

    const localStorageHints = localStorage.getItem('hints')
    if (localStorageHints == null) {
        localStorage.setItem('hints', true)
        scheduleHintsTable.classList.toggle('hints-active')
        scheduleContents.classList.toggle('hints-active')
    }
    if (localStorageHints === 'true') {
        scheduleHintsTable.classList.toggle('hints-active')
        scheduleContents.classList.toggle('hints-active')
    }

    scheduleBtn.onclick = async () => {
        alert('Вы будете перенаправлены на сайт МИЭТа, выберите нужную группу а затем нажмите "Сохранить в ОРИОКС"')
        location.href = 'https://miet.ru/schedule'
    }

    HintsBtn.onclick = () => {
        localStorage.setItem('hints', localStorage.getItem('hints') !== 'true')
        scheduleHintsTable.classList.toggle('hints-active')
        scheduleContents.classList.toggle('hints-active')
    }
}


async function loadSchedule() {
    const [schedule, group] = await new Promise(resolve => chrome.runtime.sendMessage({ data: 'getSchedule' }, response => {
        if (!chrome.runtime.lastError)
            resolve([response.answer, response.group])
        else fetchError()
    }))
    document.querySelectorAll('.schedule td:not(:first-child)').forEach(child => {
        child.textContent = ''
        child.classList.add('holiday')
        child.classList.remove('lecture')
        child.classList.remove('lab')
        child.classList.remove('sem')
    })

    //если группа не выбрана
    if (!schedule.length)
        return

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
        appendCell(td, ch)
    }
    //второй числитель
    for (const ch of schedule[2]) {
        const td = document.querySelector(`.ch .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)
        appendSecondRowInCell(td, ch)
    }
    //первый знаменатель
    for (const ch of schedule[4]) {
        const td = document.querySelector(`.zn .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)
        appendCell(td, ch)
    }
    //второй знаменатель
    for (const ch of schedule[5]) {
        const td = document.querySelector(`.zn .schedule-${ch[2].split(' ')[0] - 1}-${ch[0]}`)
        appendSecondRowInCell(td, ch)
    }


    setCurrentDates()

    document.querySelector('.row h3').textContent = `Группа: ${group.toUpperCase()}`
}


function appendCell(td, ch) {
    if (td.children.length === 0) {
        td.append(document.createElement('div'))
        const div = document.createElement('div')
        div.classList.add('holiday')
        td.append(div)
    }
    td.classList.add('includes-div')
    td.children[0].innerText = withoutLessonType(ch[1]) + '\n' + ch[3]
    colorizeTable(td.children[0], ch[1])
}

function appendSecondRowInCell(td, ch) {
    if (td.children.length === 0) {
        const div = document.createElement('div')
        div.classList.add('holiday')
        td.append(div)
    }
    if (td.children.length === 1)
        td.append(document.createElement('div'))
    td.classList.add('includes-div')
    td.children[1].innerText = withoutLessonType(ch[1]) + '\n' + ch[3]
    colorizeTable(td.children[1], ch[1])
}

function withoutLessonType(name) {
    const n = name.split(' ')
    if (n[n.length - 1] === '[Пр]' || n[n.length - 1] === '[Лек]' || n[n.length - 1] === '[Лаб]')
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
            if (block.textContent !== '')
                block.classList.add('sem')
    }
}


function fetchError() {
    document.documentElement.style.visibility = 'visible'
    document.body.innerHTML = `
            <nav id="w0" class="navbar-inverse navbar"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#w0-collapse"><span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span></button><a class="navbar-brand" href="/">ОРИОКС</a></div><div id="w0-collapse" class="collapse navbar-collapse"><ul id="w1" class="navbar-nav nav"><li><a href="https://orioks.miet.ru/student/practice/index">Практика</a></li>
            <li><a href="https://orioks.miet.ru/student/student">Обучение</a></li><li><a href="/schedule">Расписание</a></li>
            <li><a href="https://orioks.miet.ru/student/homework/list">Домашние задания</a></li>
            <li class="dropdown"><a class="dropdown-toggle" href="https://orioks.miet.ru/" data-toggle="dropdown">Портфолио <span class="caret"></span></a><ul id="w2" class="dropdown-menu"><li><a href="https://orioks.miet.ru/portfolio/list-uchebnie-project" tabindex="-1">Учебное</a></li>
            <li><a href="https://orioks.miet.ru/portfolio/list-vneuchebnie-project" tabindex="-1">Внеучебное</a></li></ul></li>
            <li><a href="https://orioks.miet.ru/social/project_work/project-list">Проектная работа</a></li>
            <li class="dropdown"><a class="dropdown-toggle" href="https://orioks.miet.ru/" data-toggle="dropdown">Заявки <span class="caret"></span></a><ul id="w3" class="dropdown-menu"><li><a href="https://orioks.miet.ru/request/questionnaire/list" tabindex="-1">Обходной лист</a></li>
            <li><a href="https://orioks.miet.ru/request/doc/list" tabindex="-1">Заявления (мат.помощь, соц стипендия, копии док-тов)</a></li>
            <li><a href="https://orioks.miet.ru/request/reference/list" tabindex="-1">Справки</a></li>
            <li><a href="https://orioks.miet.ru/request/holiday/create" tabindex="-1">Последипломный отпуск</a></li></ul></li>
            <li><a href="https://orioks.miet.ru/other/libraries">Электронные библиотеки</a></li>
            <li><a href="https://orioks.miet.ru/support/list">Помощь</a></li></ul><ul id="w4" class="navbar-nav navbar-right nav"><li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#" title="Уведомления и объявления">
                    <i class="nav-icon fa fa-bell" id="notification-bell"></i>
                    <span class="badge btn-xs count-messages-top-menu" id="notification-counter"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-left" style="width: 300px;">
                    <div class="notifications-list" id="notifications">
                    </div>
                    <div class="notifications-empty">
                        Нет новых уведомлений
                    </div>
            
                    <a href="/notification/index">
                        <div class="notification-more notification-more-all" style="">
                            Отобразить все
                        </div>
                        <div class="notification-more notification-more-hidden" style="display: none;">
                            Еще&nbsp;<span id="notification-more-counter"></span>
                        </div>
                    </a>
                </div>
            </li>
            <li class="active"><a><span class="glyphicon glyphicon-calendar"></span> Сессия</a></li>
            <li class="dropdown"><a class="dropdown-toggle" href="#" data-toggle="dropdown">Профиль<span class="caret"></span></a><ul id="w5" class="dropdown-menu"><li><a href="https://orioks.miet.ru/user/profile" tabindex="-1">Профиль</a></li>
            <li><a href="https://orioks.miet.ru/personal/files/index" tabindex="-1">Личные файлы</a></li>
            <li class="divider" style="margin: 0;"></li>
            <li><a href="https://orioks.miet.ru/user/logout" data-method="post" tabindex="-1">Выход</a></li></ul></li></ul></div></div></nav>
            <div class="schedule-not-found">
            <h2>Расписание будет доступно во время семестра</h2>
            <a href="https://orioks.miet.ru/">Назад<a/>
            </div>
            `
}


function mobileSchedule() {
    const table = document.createElement('table')
    table.classList.add('hints')
    const tr = document.createElement('tr')
    const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    for (const day in days) {
        const td = document.createElement('td')
        const button = document.createElement('button')
        button.textContent = days[day]
        button.classList.add('switcher')

        const visibleTds = document.querySelectorAll('.schedule :not(tr, .mobile-hidden, :first-child, br, div)')
        const neededTds = [...document.querySelectorAll(`.schedule th:nth-child(${Number(day) + 2})`)]
        for (let i = 0; i < 7; i++)
            neededTds.push(...document.querySelectorAll(`.schedule-${i}-${Number(day) + 1}`))

        button.onclick = () => {
            visibleTds.forEach(td => td.classList.add('mobile-hidden'))
            neededTds.forEach(td => td.classList.remove('mobile-hidden'))
        }

        td.append(button)
        tr.append(td)
    }
    table.append(tr)
    document.querySelector('.schedule-contents').prepend(table)
}

function setCurrentDates() {
    const currentDate = new Date()
    let today = currentDate.getDay()
    
    const identifyWeek = {
        'числитель': 'ch',
        'знаменатель': 'zn'
    }

    let whichWeek,
        weekNumber

    if (document.querySelector('.small') !== null) {
        whichWeek = document.querySelector('.small').textContent.trim().split(' ')
        weekNumber = identifyWeek[whichWeek[3]]
    }
    else
        weekNumber = 'ch'

    const time = [
        ['9:00', '10:30'],
        ['10:40', '12:10'],
        ['12:20', '14:20'],
        ['14:30', '16:00'],
        ['16:10', '17:40'],
        ['18:20', '19:50'],
        ['20:00', '21:30']
    ]

    const lessonNumber = time.findIndex(([start, end]) => {
        const [startHours, startMinutes] = start.split(':')
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), +startHours, +startMinutes)
        const [endHours, endMinutes] = end.split(':')
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), +endHours, +endMinutes)
        return startDate < currentDate && currentDate < endDate
    })
    if (lessonNumber !== -1) {
        const currentLesson = document.querySelector(`.${weekNumber} td.schedule-${lessonNumber}-${today}:not(:first-child)`)
        if (currentLesson) {
            if (currentLesson.children.length == 2)
                currentLesson.children[Number(whichWeek[2]) - 1].classList.add('current-lesson')
            else
                currentLesson.classList.add('current-lesson')
        }
    }

    if (today === 0)
        today = 1

    const mobileHidden = document.querySelectorAll(`.schedule :not(tr, br, div, :first-child, :nth-child(${today + 1}))`)
    mobileHidden.forEach(tr => tr.classList.add('mobile-hidden'))

    const todayColumn = document.querySelector(`.${weekNumber} th:not(:first-child, .mobile-hidden)`)
    todayColumn.classList.add('today-column')

    const mobileVisible = document.querySelector('.schedule-contents :first-child')
    mobileVisible.classList.add('mobile-visible')
}
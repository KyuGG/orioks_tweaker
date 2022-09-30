async function fetchSchedule(group) {
    const scheduleAPI = `https://miet.ru/schedule/data?group=${group}`
    const schedule = await (await fetch(scheduleAPI).catch(err => fetchError())).json()
    if (!schedule.Data)
        return
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
            if (ch1[item] === ch2[segment]) {
                ch.push(ch1[item])
                ch1Indexes.push(Number(item))
                ch2Indexes.push(Number(segment))
            }
        }
    }

    for (const item in zn1) {
        for (const segment in zn2) {
            if (zn1[item] === zn2[segment]) {
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

    ch = ch.map(splitByVerticalLine)
    ch1 = ch1.map(splitByVerticalLine)
    ch2 = ch2.map(splitByVerticalLine)
    zn = zn.map(splitByVerticalLine)
    zn1 = zn1.map(splitByVerticalLine)
    zn2 = zn2.map(splitByVerticalLine)

    const result = [ch, ch1, ch2, zn, zn1, zn2]
    chrome.runtime.sendMessage({ data: 'setSchedule', schedule: result, group: group }, response => {
        if (!chrome.runtime.lastError)
            console.log(response.answer)
        else console.log('error')
    })

    function splitByVerticalLine(el) {
        return el.split('|')
    }
}

window.onload = () => {
    document.querySelector('.buttons').insertAdjacentHTML('beforeEnd', '<span class="day save-schedule">Сохранить в ОРИОКС</span>')
    const saveSchedule = document.querySelector('.save-schedule')
    saveSchedule.style.background = '#c5e0b5'
    saveSchedule.onclick = async () => {
        const group = document.querySelector('.selection span span').title
        if (!group) {
            alert('Выберите группу')
            return
        }
        await fetchSchedule(group)
        alert('Расписание было сохранено и теперь доступно в ОРИОКСе')
        location.href = 'https://orioks.miet.ru/schedule'
    }
}
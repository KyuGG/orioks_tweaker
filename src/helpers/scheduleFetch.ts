import DefaultResponse from '@/interfaces/DefaultResponse'
import { LessonParsed } from '@/interfaces/Lesson'
import wakeUpBackground from './wakeUpBackground'

/** Парсит расписание группы и записывает в chrome storage*/
export default async function scheduleFetch(group: string) {
    const scheduleAPI = `https://miet.ru/schedule/data?group=${group}`
    const schedule = await fetch(scheduleAPI)
        .then(res => res.json())
        .catch(err => {
            console.error(err)
            alert('Ошибка загрузки расписания')
        })

    if (!schedule.Data) return
    const identifyWeek: Record<number, string> = {
        0: 'ch1',
        1: 'zn1',
        2: 'ch2',
        3: 'zn2',
    }

    const simpleSchedule = schedule.Data.map((el: any) => [
        el.Day,
        el.Class.Name,
        el.Time.Time,
        el.Room.Name,
        identifyWeek[el.DayNumber],
    ])
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

    ch = ch.map(splitByVerticalLine) as LessonParsed
    ch1 = ch1.map(splitByVerticalLine) as LessonParsed
    ch2 = ch2.map(splitByVerticalLine) as LessonParsed
    zn = zn.map(splitByVerticalLine) as LessonParsed
    zn1 = zn1.map(splitByVerticalLine) as LessonParsed
    zn2 = zn2.map(splitByVerticalLine) as LessonParsed

    const result = [ch, ch1, ch2, zn, zn1, zn2]

    await wakeUpBackground()
    chrome.runtime.sendMessage(
        { task: 'setSchedule', schedule: result, group: group },
        (response: DefaultResponse) => console.log(response.answer)
    )
}

function splitByVerticalLine(el: string) {
    return el.split('|')
}

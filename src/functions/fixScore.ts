import countScoreObject from '../interfaces/countScoreObject'

export default function fixScore() {
    if (!(location.pathname === '/student/student')) return false
    removeJunk()
    const dises = document.querySelectorAll('tr.pointer span.grade')
    const json = JSON.parse(document.querySelector('#forang').textContent).dises
    for (const i in json) {
        const scores = countScore(json[i])
        dises[i].textContent = String(Math.round(scores.real * 100) / 100)
        const percent = Math.round((scores.real / scores.max) * 100)
        dises[i].className = percentGrade(percent)
    }
}

/**
 * @summary удаление красных точек (.bad), надписей типа 'из 100' (.mvb) и кнопки 'балл' (thead.ng-scope th:last-child)
 */
function removeJunk() {
    document
        .querySelectorAll('.bad, .mvb, thead.ng-scope th:last-child')
        .forEach(el => el.remove())
}

/**
 * @summary возвращает класс для элемента оценки, отражающий эффективность учащегося
 * @param percent процент, отражающий эффективность учащегося на данный момент (0..100)
 * @returns строка, в которой указаны классы, которые необходимо присвоить элементу с оценкой
 */
function percentGrade(percent: number): string {
    if (percent >= 86) return 'grade_5 grade'
    else if (percent >= 70) return 'grade_4 grade'
    else if (percent >= 50) return 'grade_3 grade'
    return 'grade_1 grade'
}

/**
 * @summary Возвращает "реальные баллы".
 * @param disc объект одной дисциплины (который выкачивается из #forang).
 * @returns объект, в котором отражается реальный максимальный (max) и реальный текущий (real) балл за дисциплину.
 */
export function countScore(disc): countScoreObject {
    const result = {
        max: 0,
        real: 0,
    }
    for (const segment of disc.segments[0].allKms) {
        if (segment.grade.b !== '-') {
            result.max += segment.max_ball
            if (!isNaN(segment.grade.b)) result.real += segment.grade.b
        }
    }
    if (result.max > 100) result.max = 100
    return result
}

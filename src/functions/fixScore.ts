export default function fixScore() {
    if (!(location.pathname === '/student/student')) return false
    removeJunk()
    const dises = document.querySelectorAll('tr.pointer span.grade')
    const json = JSON.parse(document.querySelector('#forang').textContent).dises
    for (const i in json) {
        let realMaxScore = 0
        let realScore = 0
        for (const segment of json[i].segments[0].allKms) {
            if (segment.grade.b !== '-') {
                realMaxScore += segment.max_ball
                if (!isNaN(segment.grade.b)) realScore += segment.grade.b
            }
        }
        if (realMaxScore > 100) realMaxScore = 100
        dises[i].textContent = String(Math.round(realScore * 100) / 100)
        const percent = Math.round((realScore / realMaxScore) * 100)
        dises[i].className = percentGrade(percent)
    }
}

/**удаление красных точек (.bad), надписей типа 'из 100' (.mvb) и кнопки 'балл' (thead.ng-scope th:last-child) */
function removeJunk() {
    document
        .querySelectorAll('.bad, .mvb, thead.ng-scope th:last-child')
        .forEach(el => el.remove())
}

/**Возвращает класс для элемента оценки, отражающий эффективность учащегося
 * @param percent процент, отражающий эффективность учащегося на данный момент (0..100)
 * @returns строка, в которой указаны классы, которые необходимо присвоить элементу с оценкой
 */
function percentGrade(percent: number): string {
    if (percent >= 86) return 'grade_5 grade'
    else if (percent >= 70) return 'grade_4 grade'
    else if (percent >= 50) return 'grade_3 grade'
    return 'grade_1 grade'
}

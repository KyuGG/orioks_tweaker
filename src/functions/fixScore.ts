export default function fixScore() {
    if (!(location.pathname == '/student/student')) return false
    removeJunk()
    const dises = document.querySelectorAll('tr.pointer span.grade')
    const json = JSON.parse(document.querySelector('#forang').textContent).dises
    for (const i in json) {
        let realMaxScore = 0
        let realScore = 0
        for (const segment of json[i].segments[0].allKms) {
            if (segment.grade.b != '-') {
                realMaxScore += segment.max_ball
                if (!isNaN(segment.grade.b)) realScore += segment.grade.b
            }
        }
        if (realMaxScore > 100) realMaxScore = 100
        dises[i].textContent = String(Math.round(realScore * 100) / 100)
        const percent = Math.round((realScore / realMaxScore) * 100)
        if (percent >= 86) dises[i].className = 'grade_5 grade'
        else if (percent >= 70) dises[i].className = 'grade_4 grade'
        else if (percent >= 50) dises[i].className = 'grade_3 grade'
        else dises[i].className = 'grade_1 grade'
    }
}

/**удаление красных точек (.bad), надписей типа 'из 100' (.mvb) и кнопки 'балл' (thead.ng-scope th:last-child) */
function removeJunk() {
    document
        .querySelectorAll('.bad, .mvb, thead.ng-scope th:last-child')
        .forEach(el => el.remove())
}

function fixScore() {
    if (location.pathname == '/student/student') {
        //удаление кнопки переключения режима отображения баллов
        document.querySelector('#bp').remove()
        //удаление th под кнопкой
        document.querySelector('tr th:nth-child(2)').remove()
        //удаление красных точек
        document.querySelectorAll('.bad').forEach(el => el.remove())
        //удаление надписей типа 'из 100'
        document.querySelectorAll('.mvb').forEach(el => el.remove())
        const dises = document.querySelectorAll('tr.pointer span.grade')
        let counter = 0
        const json = JSON.parse(document.querySelector('#forang').textContent).dises
        json.forEach(disc => {
            let realMaxScore = 0
            let realScore = 0
            disc.segments[0].allKms.forEach(segment => {
                if (segment.grade.b != '-') {
                    realMaxScore += segment.max_ball
                    if (!isNaN(segment.grade.b))
                        realScore += segment.grade.b
                }
            })
            dises[counter].textContent = Math.round(realScore * 100) / 100
            const percent = Math.round(realScore / realMaxScore * 100)
            if (percent >= 86) dises[counter].className = 'grade_5 grade'
            else if (percent >= 70) dises[counter].className = 'grade_4 grade'
            else if (percent >= 50) dises[counter].className = 'grade_3 grade'
            else dises[counter].className = 'grade_1 grade'
            counter += 1
        })
    }
}
function changeTheme() {
    document.documentElement.style.setProperty('--color1', '#0f1010')
    document.documentElement.style.setProperty('--color2', 'black')
    document.documentElement.style.setProperty('--color3', '#0b0c0c')
    document.documentElement.style.setProperty('--color4', 'rgb(20, 33, 41)')
    document.documentElement.style.setProperty('--color5', 'rgb(0, 140, 186)')
    document.documentElement.style.setProperty('--navbar', '#0e0e0c')
    document.documentElement.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.8)')
    document.documentElement.style.setProperty('--border-color', '#2f2f33')
}

function coloredElements() {
    coloredTestImages()
    coloredNewsText()
}

function coloredTestImages() {
    if (location.pathname == '/student/student/test' || location.pathname == '/student/student/test/')
        document.querySelectorAll('img').forEach(img => img.classList.add('invert-img'))
}

function coloredNewsText() {
    let selector
    switch (location.pathname) {
        case '/student/student':
            document.body.onclick = async evt => {
                if (evt.target.tagName == 'A' && evt.target.href == location.href + '#') {
                    await sleep(1000)
                    const modalText = document.querySelectorAll('.modal-body div.ng-binding *:not(a)')
                    modalText.forEach(el => el.style.color = shadeColor(el.style.color, 1))
                }
            }
            break

        case '/main/view-news':
            selector = '.well *:not(a)'
            break

        case '/student/news/view':
            selector = '.container div.margin-top *:not(a)'
            break

        case '/student/news/index':
            selector = '.list-view div *:not(a)'
            break
    }
    if (selector)
        document.querySelectorAll(selector).forEach(el => el.style.color = shadeColor(el.style.color, 1))
}

function shadeColor(color, percent) {

    let R = parseInt(color.substring(1, 3), 16)
    let G = parseInt(color.substring(3, 5), 16)
    let B = parseInt(color.substring(5, 7), 16)

    R = parseInt(R * (100 + percent) / 100)
    G = parseInt(G * (100 + percent) / 100)
    B = parseInt(B * (100 + percent) / 100)

    R = (R < 255) ? R : 255
    G = (G < 255) ? G : 255
    B = (B < 255) ? B : 255

    const RR = ((R.toString(16).length == 1) ? '0' + R.toString(16) : R.toString(16))
    const GG = ((G.toString(16).length == 1) ? '0' + G.toString(16) : G.toString(16))
    const BB = ((B.toString(16).length == 1) ? '0' + B.toString(16) : B.toString(16))

    return '#' + RR + GG + BB
}
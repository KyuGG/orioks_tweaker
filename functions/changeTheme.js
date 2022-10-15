let theme = {}

function loadTheme() {
    if(localStorage.customTheme) theme = JSON.parse(localStorage.customTheme)
    else resetTheme()
    applyTheme()
}

function saveTheme() {
    localStorage.setItem('customTheme', JSON.stringify(theme))
}

function resetTheme() {
    theme.color1 = '#0f1010'
    theme.color2 = 'black'
    theme.color3 = '#0b0c0c'
    theme.color4 = 'rgb(20, 33, 41)'
    theme.color5 = 'rgb(0, 140, 186)'
    theme.navbar = '#0e0e0c'
    theme.textColor = 'rgba(255, 255, 255, 0.8)'
    theme.borderColor = '#2f2f33'
    saveTheme()
}

function applyTheme() {
    for(let i in theme){
        document.documentElement.style.setProperty('--' + i, theme[i])
    }
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
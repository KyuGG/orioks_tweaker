const DEFAULT_THEME = {
    'color1': '#ffffff',
    'color2': '#006687',
    'color3': '#f5f5f5',
    'color4': '#dff0d8',
    'color5': '#43ac6a',
    'textColor': '#000000',
    'navbar': '#008cba',
    'navbarText': '#ffffff',
    'borderColor': '#dddddd',
    'ding': '#e5140d'
}

const AUTHOR_THEME = {
    'color1': '#0f1010',
    'color2': '#000000',
    'color3': '#0b0c0c',
    'color4': '#142129',
    'color5': '#008cba',
    'navbar': '#0e0e0c',
    'navbarText': '#ffffff',
    'ding': '#e5140d',
    'textColor': '#ffffff',
    'borderColor': '#2f2f33',
    'testraw': '!raw'
}

function loadTheme() {
    if (localStorage.customTheme) theme.importStyles(JSON.parse(localStorage.customTheme))
    else {
        loadThemeSchema(AUTHOR_THEME)
        saveTheme()
        alert('Была загружена и применена авторская тема одного из создателей этого расширения. Перейдите на вкладку "Стиль", если желаете её изменить.')
    }
    applyTheme()
}

function saveTheme() {
    localStorage.setItem('customTheme', JSON.stringify(theme.getAllStyles()))
}

function loadThemeSchema(themeSchema = DEFAULT_THEME) {
    theme.importStyles(themeSchema)
}

function applyTheme() {
    for (const i of theme.getKeys()) {
        document.documentElement.style.setProperty('--' + i, theme.getStyle(i))
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
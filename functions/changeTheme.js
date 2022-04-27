function changeTheme() {
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = chrome.runtime.getURL('newCSSRules/styles.css')
    document.head.append(css)
    document.documentElement.style.setProperty('--color1', '#202124')
    document.documentElement.style.setProperty('--color2', '#353535')
    document.documentElement.style.setProperty('--color3', '#1c1b18')
    document.documentElement.style.setProperty('--color4', 'rgb(20, 33, 41)')
    document.documentElement.style.setProperty('--color5', 'rgb(0, 140, 186)')
    document.documentElement.style.setProperty('--navbar', '#1c1b18')
    document.documentElement.style.setProperty('--text-color', 'white')
}

function coloredElements() {
    coloredTestImages()
    coloredNewsText()
}

function coloredTestImages() {
    if (location.pathname == '/student/student/test' || location.pathname == '/student/student/test/')
        document.querySelectorAll('img').forEach(img => img.classList.add('green-img'))
}

function coloredNewsText() {
    if (location.pathname == '/main/view-news')
        document.querySelectorAll('.well *').forEach(el => el.style.color = shadeColor(el.style.color, 1))
    if (location.pathname == '/student/news/view')
        document.querySelectorAll('.container div.margin-top *').forEach(el => el.style.color = shadeColor(el.style.color, 1))
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
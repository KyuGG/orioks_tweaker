function changeTheme() {
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
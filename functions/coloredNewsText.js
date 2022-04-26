function coloredNewsText() {
    if (location.pathname == '/main/view-news')
        document.querySelectorAll('.well *').forEach(el => el.style.color = shadeColor(el.style.color, 1))
    if (location.pathname == '/student/news/view')
        document.querySelectorAll('.container div.margin-top *').forEach(el => el.style.color = shadeColor(el.style.color, 1))
}
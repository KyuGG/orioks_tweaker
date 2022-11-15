function preparePage(title) {
    document.title = title
    document.querySelectorAll('.col-md-6').forEach(block => block.remove())
    const container = document.querySelector('.container.margin-top')
    container.insertAdjacentHTML('afterbegin', `
        <ul class="breadcrumb">
            <li><a href="/">Главная</a></li>
            <li><a href="${location.href}">${title}</a></li>
        </ul>
        `)
}
function runDownload() {
    if (location.pathname == '/student/student')
        downloadFromModal()
    if (location.pathname == '/student/ir/') {
        const resourceLinks = document.querySelectorAll('.list-group a')
        download(resourceLinks)
    }
}

function download(links) {
    links.forEach(a => {
        if (a.href.split(':')[0] == 'http') {
            a.href = 'https' + a.href.slice(4)
            a.removeAttribute('target')
        }
    })
}

function downloadFromModal() {
    document.body.onclick = evt => {
        if (evt.target.tagName == 'A' && evt.target.className == 'pointer ng-binding') {
            let links = document.querySelectorAll('.modal-body .table a')
            while (links.length == 0)
                setTimeout(links = document.querySelectorAll('.modal-body .table a'), 1000)
            download(links)
        }
    }
}
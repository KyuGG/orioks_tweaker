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
    const tbody = document.querySelector('.table tbody')
    tbody.onclick = () => {
        const segmentsTbody = document.querySelectorAll('.table tbody')[1]
        segmentsTbody.onclick = evt => {
            if (evt.target.tagName == 'A') {
                let links = document.querySelectorAll('.modal-body .table a')
                while (links.length == 0)
                    setTimeout(links = document.querySelectorAll('.modal-body .table a'), 1000)
                download(links)
            }
        }
    }
}
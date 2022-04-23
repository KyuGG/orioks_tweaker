function download() {
    if (location.pathname == '/student/ir/') {
        document.querySelectorAll('.list-group a').forEach(a => {
            if (a.href.split(':')[0] == 'http') {
                a.href = 'https' + a.href.slice(4)
                a.removeAttribute('target')
            }
        })
    }
    if (location.pathname == '/student/student') {
        // добираемся с помощью листнеров до кликов по новостям
        let dises = document.getElementsByClassName('pointer ng-scope')
        Array.prototype.forEach.call(dises, dis => {
            dis.addEventListener('click', async () => {
                await sleep(500)
                document.querySelectorAll('.discussion-label-span .pointer').forEach(link => {
                    link.addEventListener('click', async () => {
                        await sleep(300)
                        document.querySelectorAll('.modal-body .table a').forEach(a => {
                            if (a.href.split(':')[0] == 'http') {
                                a.href = 'https' + a.href.slice(4)
                                a.removeAttribute('target')
                            }
                        })
                    })
                })
            })
        })
    }
}
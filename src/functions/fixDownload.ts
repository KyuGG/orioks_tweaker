/** Заменяет http на https в ссылках на файлы, тем самым позволяет скачать файл */
export default function fixDownload() {
    document.documentElement.onclick = evt => {
        const target = evt.target as HTMLElement

        if (target.tagName === 'A') {
            const link = target as HTMLLinkElement
            if (link.href.startsWith('http://emirs')) {
                evt.preventDefault()
                link.href = link.href.replace('http', 'https')
                link.removeAttribute('target')
                link.click()
            }
        }
    }
}

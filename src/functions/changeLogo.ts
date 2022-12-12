export default function changeLogo() {
    const logoLink = chrome.runtime.getURL('assets/logo.png')
    const icon = document.createElement('link')
    icon.rel = 'icon'
    icon.type = 'image/png'
    icon.href = logoLink
    document.head.append(icon)

    if (location.pathname === '/user/profile') {
        const logo = document.querySelector(
            '.img-responsive'
        ) as HTMLImageElement
        logo.src = logoLink
    }
}

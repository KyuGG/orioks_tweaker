function logo() {
    const logoLink = chrome.runtime.getURL('interface/logo.png')
    const icon = document.createElement('link')
    icon.rel = 'icon'
    icon.type = 'image/png'
    icon.href = logoLink
    document.querySelector('head').append(icon)

    if (location.pathname == '/user/profile') {
        const logo = document.querySelector('.img-responsive')
        logo.src = logoLink
    }
}
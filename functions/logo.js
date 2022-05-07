function logo() {
    const icon = document.createElement('link')
    icon.rel = 'icon'
    icon.type = 'image/png'
    icon.href = chrome.runtime.getURL('interface/logo.png')
    document.querySelector('head').append(icon)

    if (location.pathname == '/user/profile') {
        const logo = document.querySelector('.img-responsive')
        logo.src = chrome.runtime.getURL('interface/logo.png')
    }
}
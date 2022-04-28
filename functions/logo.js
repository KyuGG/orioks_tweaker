function logo() {
    if (location.pathname == '/user/profile') {
        const logo = document.querySelector('.img-responsive')
        logo.src = chrome.runtime.getURL('interface/logo.png')
    }
}
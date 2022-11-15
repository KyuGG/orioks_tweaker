//TODO: REWRITE
function appendNavItems(navItems) {
    const nav = document.querySelector('.navbar-nav')
    for (const i of navItems) if (i.condition) {
        const navButton = document.createElement('li')
        const navButtonLink = document.createElement('a')
        navButtonLink.textContent = i.name
        navButtonLink.href = i.href
        navButton.append(navButtonLink)
        nav.children[i.position].after(navButton)
    }
}
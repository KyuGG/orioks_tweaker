//TODO: REWRITE
function appendNavItems(navItems) {
    const nav = document.querySelector('.navbar-nav')
    for(let i of navItems) if(i.condition){
        let navButton = document.createElement('li')
        let navButtonLink = document.createElement('a')
        navButtonLink.textContent = i.name
        navButtonLink.href = i.href
        navButton.append(navButtonLink)
        nav.children[i.position].after(navButton)
    }
}
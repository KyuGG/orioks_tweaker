function bugReport() {
    if (!(location.pathname === '/bugreport'))
        return
    document.querySelector('.row').remove()
    const myDiv = document.createElement('div')
    const h1 = document.createElement('h1')
    const h2 = document.createElement('h2')
    h1.textContent = 'Orioks Tweaker'
    h2.textContent = 'Напишите об ошибке'

    const gitHub = document.createElement('a')
    gitHub.href = 'https://github.com/KyuGG/orioks_tweaker/issues'
    gitHub.textContent = 'GitHub'
    gitHub.style.fontSize = '22pt'

    const vk = document.createElement('a')
    vk.href = 'https://vk.me/kyugg'
    vk.textContent = 'VK'
    vk.style.fontSize = '22pt'

    const br = document.createElement('br')

    myDiv.append(gitHub, br, vk)
    document.querySelector('.site-error').append(h1, h2, myDiv)
}
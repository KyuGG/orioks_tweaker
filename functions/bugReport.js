function bugReport() {
    document.getElementsByClassName('row')[0].remove()
    let myDiv = document.createElement('div')
    let h1 = document.createElement('h1')
    h1.textContent = 'Orioks Tweaker'
    let h2 = document.createElement('h2')
    h2.textContent = 'Напишите об ошибке'

    let gitHub = document.createElement('a')
    gitHub.href = 'https://github.com/KyuGG/orioks_tweaker/issues'
    gitHub.textContent = 'GitHub'
    gitHub.style.fontSize = '22pt'

    let vk = document.createElement('a')
    vk.href = 'https://vk.me/kyugg'
    vk.textContent = 'VK'
    vk.style.fontSize = '22pt'

    let br = document.createElement('br')

    myDiv.append(gitHub)
    myDiv.append(br)
    myDiv.append(vk)
    document.getElementsByClassName('site-error')[0].append(h1)
    document.getElementsByClassName('site-error')[0].append(h2)
    document.getElementsByClassName('site-error')[0].append(myDiv)
}
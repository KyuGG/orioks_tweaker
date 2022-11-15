async function customThemePage() {
    if (!(location.pathname === '/customization'))
        return

    preparePage('Стиль')

    const content = document.querySelector('.row')

    const buttons = document.createElement('div')

    const title = document.createElement('h3')
    title.textContent = 'Settings (BETA!)'

    const buttonList = []

    buttonList.push(createButton('Apply Styles', () => {
        const colors = getCubeColors()
        for (const i in colors) theme.setStyleRGB(i, colors[i])
        applyTheme()
    }))

    buttonList.push(createButton('Reset to ORIOKS Styles', () => {
        loadThemeSchema(DEFAULT_THEME)
        setCubeColors()
    }))

    buttonList.push(createButton('Reset to Author Styles', () => {
        loadThemeSchema(AUTHOR_THEME)
        setCubeColors()
    }))

    buttonList.push(createButton('Save Styles', () => {
        saveTheme()
    }))

    buttonList.push(createButton('Debug Styles', () => {
        console.log(theme)
        console.log(getCubeColors())
    }))

    content.appendChild(title)
    appendList(buttons, buttonList)

    for (const i in varDesc) {
        content.appendChild(createRGBSlider(i))
    }

    content.appendChild(buttons)
}

function createButton(text, callback) {
    const btn = document.createElement('button')
    btn.classList.add('my-btn')
    btn.textContent = text
    btn.addEventListener('click', callback)
    return btn
}

function appendList(parent, children) {
    for (const el of children) parent.appendChild(el)
}

function createRGBSlider(varName) {
    const result = document.createElement('div')
    const title = document.createElement('h2')
    title.textContent = varName
    const label = document.createElement('label')
    label.textContent = varDesc[varName]
    const element = document.createElement('div')
    element.style.display = 'flex'
    const sliders = document.createElement('div')
    sliders.style.display = 'flex'
    sliders.style.flexDirection = 'column'
    for (let i = 0; i < 3; i++) {
        const field = document.createElement('div')
        field.style.display = 'flex'
        field.style.flexDirection = 'row'
        const slider = document.createElement('input')
        const textInput = document.createElement('input')
        slider.type = 'range'
        slider.value = 20
        slider.min = 0
        slider.max = 255
        slider.addEventListener('input', changeSlider)
        textInput.addEventListener('input', changeSlider)
        textInput.type = 'number'
        textInput.value = 20
        textInput.min = 0
        textInput.max = 255
        textInput.style.height = '20px'
        textInput.style.width = '60px'
        field.appendChild(slider)
        field.appendChild(textInput)
        sliders.appendChild(field)
    }

    const rgbShow = document.createElement('div')
    rgbShow.style.width = '60px'
    rgbShow.style.height = '60px'
    rgbShow.style.border = '1px solid white'

    rgbShow.style.backgroundColor = theme.getStyle(varName)

    rgbShow.id = varName
    rgbShow.classList.add('rgbCube')

    element.appendChild(sliders)
    element.appendChild(rgbShow)

    syncSlidersCube(element)

    result.appendChild(title)
    result.appendChild(label)
    result.appendChild(element)

    return result
}

function changeSlider(e) {
    let value = e.path[0].value
    if (value > 255) value = 255
    else if (value < 0) value = 0
    e.path[1].childNodes.forEach(ch => ch.value = value)

    changeCube(e.path[3])
}

function changeCube(block) {
    const colors = block.children[0].children
    const cube = block.children[1]
    const R = colors[0].children[0].value
    const G = colors[1].children[0].value
    const B = colors[2].children[0].value

    cube.style.backgroundColor = `rgb(${R}, ${G}, ${B})`
}

function getCubeColors() {
    let result = {}
    document.querySelectorAll('.rgbCube').forEach(el => result[el.id] = el.style.backgroundColor)
    return result
}

function setCubeColors() {
    for (const i in varDesc) {
        document.getElementById(i).style.backgroundColor = theme[i]
    }
}

function syncSlidersCube(block) {
    colors = block.children[1].style.backgroundColor.replace('rgb(', '').replace(')', '').split(', ')
    sliders = block.children[0].children
    for (let i = 0; i < 3; i++) { sliders[i].children[0].value = colors[i]; sliders[i].children[1].value = colors[i] }
}

const varDesc = {
    'color1': 'Фон основного контента страницы.',
    'color2': 'Фон при наведении на кнопки панели навигации (меню).',
    'color3': '',
    'color4': '',
    'color5': '',
    'navbar': 'Фон навигационной панели.',
    'navbarText': 'Цвет текста в навигационной панели.',
    'textColor': 'Цвет текста, применяемый в основном контенте страницы.',
    'borderColor': 'Цвет границ объектов.',
    'ding': 'Цвет фона "колокольчика уведомлений"'
}
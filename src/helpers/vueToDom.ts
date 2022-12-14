import { Component, createApp } from 'vue'

/**Функция монтирует vue в HTML элемент для дальнейшей вставки в DOM*/
export default function vueToDom(App: Component) {
    const container = document.createElement('div')

    createApp(App).mount(container)

    return container.firstChild as HTMLElement
}

import { Component, createApp } from 'vue'

declare type Data = Record<string, unknown>

/**Функция монтирует vue в HTML элемент для дальнейшей вставки в DOM*/
export default function vueToDom(
    App: Component,
    rootProps?: Data | null | undefined
) {
    const container = document.createElement('div')

    createApp(App, rootProps).mount(container)

    return container.firstChild as HTMLElement
}

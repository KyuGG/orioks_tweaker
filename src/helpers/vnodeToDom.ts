import { render } from 'vue'

/**Функция преобразует виртуальную ноду в DOM элемент*/
export default function vnodeToDom(vnode: JSX.Element) {
    const container = document.createElement('div')

    render(vnode, container)

    return container.firstChild as Node
}

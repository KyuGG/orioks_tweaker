import defaultResponse from '@/interfaces/DefaultResponse'
import sleep from './sleep'

export default async function wakeUpBackground() {
    while (!(await getStatus())) await sleep(200)
    return true
}

function getStatus(): Promise<defaultResponse> {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(
            { task: 'wakeUp' },
            (response: defaultResponse | undefined) => {
                chrome.runtime.lastError
                resolve(response as defaultResponse)
            }
        )
    })
}

export default function wakeUpBackground(): Promise<void> {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({ task: 'wakeUp' }, () => {
            chrome.runtime.lastError ? null : null
            resolve()
        })
    })
}

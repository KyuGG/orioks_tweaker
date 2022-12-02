export default function wakeUpBackground(): Promise<void> {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({ task: 'wakeUp' }, () => {
            if (chrome.runtime.lastError) {}
            resolve()
        })
    })
}

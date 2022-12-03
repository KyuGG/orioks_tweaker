export default interface StorageSettings {
    version: string
    settings: {
        fixScore: boolean
        fixDownload: boolean
        schedule: boolean
        disciplineNames: boolean
        darkTheme: boolean
    }
    schedule: []
    group: string
}

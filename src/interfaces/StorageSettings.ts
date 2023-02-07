import { LessonParsed } from '@/interfaces/Lesson'

export interface StorageSettings {
    version: string
    settings: Settings
    schedule: LessonParsed[][]
    group: string
}

export interface Settings {
    fixScore: boolean
    fixDownload: boolean
    schedule: boolean
    disciplineNames: boolean
    darkTheme: boolean
}

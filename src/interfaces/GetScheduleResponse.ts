import { LessonParsed } from '@/interfaces/Lesson'

export default interface GetScheduleResponse {
    schedule: LessonParsed[][]
    group: string
}

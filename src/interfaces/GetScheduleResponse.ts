import DefaultResponse from './DefaultResponse'
import { LessonParsed } from '@/interfaces/Lesson'

export default interface GetScheduleResponse extends DefaultResponse {
    schedule: LessonParsed[][]
    group: string
}

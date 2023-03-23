export class ResponseDto<T> {
    data?: T
    error?: {
        code?: string,
        message: string,
        statusCode: number
    }
    messages?: {
        code: number,
        message: string
    }[]
}
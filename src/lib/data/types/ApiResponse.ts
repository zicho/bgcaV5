import { ResponseSuccess } from "../strings/MiscMessages";

export type ApiResponse<T> = {
    result?: T | null;
    error: boolean;
    message: string;
}

export function successfulResponse<T>(data?: T): ApiResponse<T> {
    return {
        result: data,
        error: false,
        message: ResponseSuccess
    }
}

export function failedResponse<T>(message: string): ApiResponse<T> {
    return {
        result: null,
        error: true,
        message
    }
}
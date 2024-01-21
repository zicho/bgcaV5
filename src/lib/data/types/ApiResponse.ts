import { ResponseSuccess } from "../strings/MiscMessages";

export type ApiResponse<T> = {
    result: T | null;
    success: boolean;
    message: string;
}

export function successfulResponse<T>(data: T): ApiResponse<T> {
    return {
        result: data,
        success: true,
        message: ResponseSuccess
    }
}

export function failedResponse<T>(message: string): ApiResponse<T> {
    return {
        result: null,
        success: false,
        message
    }
}
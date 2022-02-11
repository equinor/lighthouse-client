/**
 * Error format recieved by server
 */
export interface ServerError {
    detail: string;
    statusCode: number;
    title: string;
    validationErrors: ValidationError
}

export interface ValidationError {
    [key: string]: string[];
}
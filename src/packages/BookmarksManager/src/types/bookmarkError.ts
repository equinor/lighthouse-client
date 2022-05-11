export type BookmarkErrorResponse = Error & {
    code?: string;
    exceptionMessage?: string;
    exceptionType?: string;
    message?: string;
};

export class BookmarkError extends Error {
    code?: string;
    private exceptionMessage?: string;
    private exceptionType?: string;

    constructor(bookmarkError: BookmarkErrorResponse) {
        super();
        this.code = bookmarkError?.code;
        this.exceptionMessage = bookmarkError?.exceptionMessage;
        this.exceptionType = bookmarkError?.exceptionType;
        this.message = bookmarkError?.message || 'Unknown error';
    }
}

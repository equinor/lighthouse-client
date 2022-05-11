export type BookmarkErrorResponse = Error & {
    code?: string;
    exceptionMessage?: string;
    exceptionType?: string;
    message?: string;
};

export class BookmarkError extends Error {
    constructor(message = 'An error occured retrieving bookmarks') {
        super(message);
    }
}

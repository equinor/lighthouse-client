import { BookmarkErrorResponse, BookmarkResponse } from '../types';

export const isBookmarkResponse = (
    data: BookmarkResponse[] | BookmarkErrorResponse
): data is BookmarkResponse[] => {
    return Array.isArray(data) && (data[0] as BookmarkResponse)?.id !== undefined;
};

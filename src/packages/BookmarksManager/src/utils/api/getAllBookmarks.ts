import { httpClient } from '@equinor/lighthouse-portal-client';
import { BookmarkError, BookmarkErrorResponse } from '../../types';
type ErrorResponse = {
    error: BookmarkErrorResponse;
};
export const getAllBookmarks = async (signal?: AbortSignal) => {
    const { fusionBookmarks } = httpClient();
    const filterSourceSystem = "$filter=sourcesystem.name eq 'Castberg-portal'";
    const response = await fusionBookmarks.get(
        `persons/me/bookmarks?api-version=1.0&${filterSourceSystem}`,
        { signal }
    );

    if (!response.ok) {
        const { error } = (await response.json()) as ErrorResponse;
        throw new BookmarkError(error?.message);
    }

    return await response.json();
};

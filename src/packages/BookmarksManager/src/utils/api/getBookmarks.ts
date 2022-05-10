import { httpClient } from '@equinor/portal-client';
import { BookmarkError, BookmarkErrorResponse } from '../../types';
type ErrorResponse = {
    error: BookmarkErrorResponse;
};
export const getBookmarks = async (appKey: string, signal?: AbortSignal) => {
    const { fusionBookmarks } = httpClient();
    // const filterAppKey = `$filter=appKey%20eq%20'jc-${appKey}'`;
    const filterAppKey = encodeURI(`$filter=appKey eq 'jc-${appKey}'`);
    const filterSourceSystem = '$filter=sourcesystem.SubSystem%20eq%20ConstructionAndCommissioning';
    const response = await fusionBookmarks.get(
        `persons/me/bookmarks?api-version=1.0&${filterAppKey}`,
        { signal }
    );

    if (!response.ok) {
        const { error } = (await response.json()) as ErrorResponse;
        throw new BookmarkError({
            code: error?.code,
            exceptionMessage: error?.exceptionMessage,
            exceptionType: error?.exceptionType,
            message: error?.message,
            name: error?.name,
        });
    }

    return await response.json();
};

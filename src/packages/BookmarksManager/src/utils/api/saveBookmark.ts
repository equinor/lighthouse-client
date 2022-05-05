import { httpClient } from '@equinor/portal-client';
import { BookmarkRequest } from '../../types';

export const saveBookmark = async (bookmarkRequest: BookmarkRequest) => {
    const { fusionBookmarks } = httpClient();
    await fusionBookmarks.post(`bookmarks?api-version=1.0`, {
        body: JSON.stringify(bookmarkRequest),
    });
};

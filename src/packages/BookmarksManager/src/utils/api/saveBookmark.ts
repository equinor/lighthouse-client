import { httpClient } from '@equinor/lighthouse-portal-client';
import { BookmarkRequest } from '../../types';

export const saveBookmark = async (bookmarkRequest: BookmarkRequest) => {
    const { fusionBookmarks } = httpClient();
    await fusionBookmarks.fetchAsync(`bookmarks?api-version=1.0`, {
        body: JSON.stringify(bookmarkRequest),
        method: 'POST',
        headers: { 'content-type': 'application/json' },
    });
};

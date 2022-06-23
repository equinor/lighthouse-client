import { httpClient } from '@equinor/lighthouse-portal-client';
import { BookmarkResponse } from '../../types';
type Bookmark<T extends unknown = unknown> = BookmarkResponse & {
    payload: T;
};
export const getBookmarkById = async (bookmarkId: string): Promise<Bookmark> => {
    const { fusionBookmarks } = httpClient();
    const res = await fusionBookmarks.get(`bookmarks/${bookmarkId}`);
    return await res.json();
};

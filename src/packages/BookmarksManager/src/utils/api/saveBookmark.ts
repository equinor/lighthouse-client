import { httpClient } from '@equinor/portal-client';
import { BookmarkRequest } from '../../types';

export const saveBookmark = async (bookmarkRequest: BookmarkRequest) => {
    const { fusion } = httpClient();
    fusion.setBaseUrl('https://pro-s-bookmarks-pr-3110.azurewebsites.net/');
    await fusion.post(`bookmarks?api-version=1.0`, { body: JSON.stringify(bookmarkRequest) });
};

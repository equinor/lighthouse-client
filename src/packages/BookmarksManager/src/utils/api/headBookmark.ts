import { httpClient } from '@equinor/lighthouse-portal-client';

export const headBookmark = async (bookmarkId: string) => {
    const { fusionBookmarks } = httpClient();
    const res = await fusionBookmarks.head(`persons/me/bookmarks/favourites/${bookmarkId}`);
    return res.ok;
};

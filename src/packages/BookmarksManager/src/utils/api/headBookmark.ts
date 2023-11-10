import { httpClient } from '@equinor/lighthouse-portal-client';

export const headBookmark = async (bookmarkId: string) => {
    const { fusionBookmarks } = httpClient();
    const res = await fusionBookmarks.fetchAsync(`persons/me/bookmarks/favourites/${bookmarkId}`, {
        method: 'HEAD',
    });
    return res.ok;
};

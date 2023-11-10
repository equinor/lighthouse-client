import { httpClient } from '@equinor/lighthouse-portal-client';

export const unFavouriteBookmark = async (bookmarkId: string): Promise<void> => {
    const { fusionBookmarks } = httpClient();
    await fusionBookmarks.fetchAsync(`persons/me/bookmarks/favourites/${bookmarkId}`, {
        method: 'DELETE',
    });
};

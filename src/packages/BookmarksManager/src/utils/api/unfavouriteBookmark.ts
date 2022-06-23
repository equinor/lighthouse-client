import { httpClient } from '@equinor/lighthouse-portal-client';

export const unFavouriteBookmark = async (bookmarkId: string): Promise<void> => {
    const { fusionBookmarks } = httpClient();
    await fusionBookmarks.delete(`persons/me/bookmarks/favourites/${bookmarkId}`);
};

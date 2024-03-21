import { httpClient } from '@equinor/lighthouse-portal-client';

export const unFavouriteBookmark = async (bookmarkId: string): Promise<void> => {
  const { fusionBookmarks } = httpClient();
  await fusionBookmarks.fetchAsync(`bookmarks/${bookmarkId}`, {
    method: 'DELETE',
  });
};

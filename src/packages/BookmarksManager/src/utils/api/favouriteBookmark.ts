import { httpClient } from '@equinor/lighthouse-portal-client';

export const favouriteBookmark = async (bookmarkId: string) => {
  const { fusionBookmarks } = httpClient();
  await fusionBookmarks.fetchAsync(`persons/me/bookmarks/favourites?api-version=1.0`, {
    body: JSON.stringify({ bookmarkId: bookmarkId }),
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  });
};

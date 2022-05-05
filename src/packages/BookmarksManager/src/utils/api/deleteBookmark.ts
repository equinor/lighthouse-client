import { httpClient } from '@equinor/portal-client';

export const deleteBookmark = async (bookmarkId: string): Promise<void> => {
    const { fusionBookmarks } = httpClient();
    await fusionBookmarks.delete(`bookmarks/${bookmarkId}?api-version=1.0`);
};

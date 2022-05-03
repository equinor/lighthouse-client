import { httpClient } from '@equinor/portal-client';

export const deleteBookmark = async (bookmarkId: string): Promise<void> => {
    const { fusion } = httpClient();
    fusion.setBaseUrl('https://pro-s-bookmarks-pr-3110.azurewebsites.net/');
    await fusion.delete(`bookmarks/${bookmarkId}?api-version=1.0`);
};

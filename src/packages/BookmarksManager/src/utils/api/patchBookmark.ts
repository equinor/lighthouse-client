import { httpClient } from '@equinor/lighthouse-portal-client';
import { BookmarkRequest } from '../../types';
export type Fields = Partial<Pick<BookmarkRequest, 'name' | 'description' | 'isShared'>>;
type Args = Fields & {
    bookmarkId: string;
};
export const patchBookmark = async ({ bookmarkId, ...args }: Args) => {
    const { fusionBookmarks } = httpClient();
    await fusionBookmarks.patch(`bookmarks/${bookmarkId}?api-version=1.0`, {
        body: JSON.stringify(args),
    });
};

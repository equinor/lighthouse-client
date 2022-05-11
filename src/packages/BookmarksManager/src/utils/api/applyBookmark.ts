import { httpClient } from '@equinor/lighthouse-portal-client';

export type BookmarkResponse<TPayload extends unknown = unknown> = {
    id: string;
    payload: TPayload;
};
export const applyBookmark = async (bookmarkId: string): Promise<BookmarkResponse> => {
    const { fusionBookmarks } = httpClient();
    const response = await fusionBookmarks.get(`bookmarks/${bookmarkId}/apply?api-version=1.0`);
    const responseJson = (await response.json()) as BookmarkResponse;
    return responseJson;
};

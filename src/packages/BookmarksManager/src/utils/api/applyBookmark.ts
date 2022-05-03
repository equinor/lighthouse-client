import { httpClient } from '@equinor/portal-client';

export type BookmarkResponse<TPayload extends unknown = unknown> = {
    id: string;
    payload: TPayload;
};
export const applyBookmark = async (bookmarkId: string): Promise<BookmarkResponse> => {
    const { fusion } = httpClient();
    fusion.setBaseUrl('https://pro-s-bookmarks-pr-3110.azurewebsites.net/');
    const response = await fusion.get(`bookmarks/${bookmarkId}/apply?api-version=1.0`);
    const responseJson = (await response.json()) as BookmarkResponse;
    return responseJson;
};

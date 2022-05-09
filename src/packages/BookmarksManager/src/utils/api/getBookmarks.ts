import { httpClient } from '@equinor/portal-client';

export const getBookmarks = async (appKey: string, signal?: AbortSignal) => {
    const { fusionBookmarks } = httpClient();
    const filterAppKey = `$filter=appKey%20eq%20'jc-${appKey}'`;
    const filterSourceSystem = '$filter=sourcesystem.SubSystem%20eq%20ConstructionAndCommissioning';
    const bookmarks = await fusionBookmarks.get(
        `persons/me/bookmarks?api-version=1.0&${filterAppKey}`,
        { signal }
    );
    return await bookmarks.json();
};

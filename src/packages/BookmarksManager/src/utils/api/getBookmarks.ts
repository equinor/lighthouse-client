import { httpClient } from '@equinor/portal-client';

export const getBookmarks = async (appKey: string) => {
    const { fusionBookmarks } = httpClient();
    const filterAppKey = `$filter=appKey%20eq%20jc-${appKey}`;
    const filterSourceSystem = '$filter=sourcesystem.SubSystem%20eq%20ConstructionAndCommissioning';
    const bookmarks = await fusionBookmarks.get(
        `persons/me/bookmarks?api-version=1.0&${filterAppKey}`
    );
    return await bookmarks.json();
};

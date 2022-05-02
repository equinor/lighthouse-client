import { httpClient } from '@equinor/portal-client';

export const getBookmarks = async (appKey: string) => {
    const { fusion } = httpClient();
    fusion.setBaseUrl('https://pro-s-bookmarks-pr-3110.azurewebsites.net/');
    const filterAppKey = `$filter=appKey%20eq%20jc-${appKey}`;
    const filterSourceSystem = '$filter=sourcesystem.SubSystem%20eq%20ConstructionAndCommissioning';
    //TODO get current app manifest
    const bookmarks = await fusion.get(
        `persons/me/bookmarks?api-version=1.0&${filterSourceSystem}`
    );
    return await bookmarks.json();
};

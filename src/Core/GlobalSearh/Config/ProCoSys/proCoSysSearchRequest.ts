import { getClientContext, httpClient } from '@equinor/lighthouse-portal-client';
import { SearchResponse } from './types';

export async function proCoSysSearchRequest(
    searchText: string,
    signal: AbortSignal
): Promise<SearchResponse | undefined> {
    const { procosysPlantId } = getClientContext();
    const { customHttpClient } = httpClient({
        scope: 'api://195ed58a-9cb8-4d93-9e37-9ad315032baf/ReadWrite',
    });

    try {
        const result = await customHttpClient.fetch(
            `https://search-test.pcs-dev.net/Search?query=${searchText}&preview=true&plant=${procosysPlantId}`,
            { signal }
        );

        if (result.ok) {
            return await result.json();
        }

        throw 'No content';
    } catch (error) {
        console.error(error);
    }
}

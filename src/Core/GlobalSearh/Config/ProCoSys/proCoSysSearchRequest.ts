import { getClientContext, httpClient } from '@equinor/lighthouse-portal-client';
import { SearchResponse } from './types';
import { useFramework } from '@equinor/fusion-framework-react';
import { useHttpClient } from '@equinor/fusion-framework-react/hooks';

export async function proCoSysSearchRequest(
    searchText: string,
    signal: AbortSignal
): Promise<SearchResponse | undefined> {
    const { procosysPlantId } = getClientContext();

    const client = useHttpClient('pcs-search' as any);
    try {
        const result = await client.fetch(
            `/Search?query=${searchText}&preview=true&plant=${procosysPlantId}`,
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

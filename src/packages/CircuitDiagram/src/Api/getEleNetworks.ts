import { httpClient } from '@equinor/lighthouse-portal-client';
import { EleNetwork } from '../types/eleNetwork';

export async function getEleNetworks(
    circuitStarterTagNos: string,
    signal?: AbortSignal
): Promise<EleNetwork[]> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(
        `api/elenetwork/facility/JCA/elenetwork/${circuitStarterTagNos}`,
        { signal }
    );
    if (!res.ok) {
        throw new Error('Failed to get elenetworks', { cause: res });
    }

    return res.json();
}

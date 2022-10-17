import { httpClient } from '@equinor/lighthouse-portal-client';
import { EleNetwork } from '../types/eleNetwork';

export async function getEleNetworks(circuitStarterTagNos: string): Promise<EleNetwork[]> {
    const { scopeChange } = httpClient();
    const eleNetworks: EleNetwork[] = await scopeChange
        .fetch(`api/elenetwork/facility/JCA/elenetwork/${circuitStarterTagNos}`)
        .then((x) => x.json());

    return eleNetworks;
}

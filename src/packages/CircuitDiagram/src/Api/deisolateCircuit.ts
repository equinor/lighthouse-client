import { httpClient } from '@equinor/lighthouse-portal-client';
import { EleNetwork } from '../types/eleNetwork';
import { throwOnError } from './throwOnError';

export async function deisolateCircuit(circuitTagNo: string): Promise<EleNetwork> {
    const { scopeChange: client } = httpClient();

    const payload = {
        tagNo: circuitTagNo,
    };

    const requestOptions = {
        method: 'POST',
        headers: { ['content-type']: 'application/json' },
        body: JSON.stringify(payload),
    };

    const res = await client.fetch(
        `api/elenetwork/facility/JCA/elenetwork/${circuitTagNo}/circuit/deisolate`,
        requestOptions
    );

    await throwOnError(res, 'Failed to deisolate circuit');

    return await res.json();
}

import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchHtCableTagNo(value: string, signal?: AbortSignal): Promise<any[]> {
    const { FAM } = httpClient();
    const htExpression = generateExpressions('Register', 'Equals', ['HEAT_TRACING_CABLE']);
    const tagNoExpression = generateExpressions('TagNo', 'Like', [value]);

    const request = generateFamRequest(['TagNo'], 'And', [...htExpression, ...tagNoExpression]);
    const res = await FAM.fetch('v1/typed/completion/completiontag/facility/JCA?view-version=v1', {
        body: JSON.stringify(request),
        method: 'POST',
        headers: { ['content-type']: 'application/json' },
        signal,
    });
    return await res.json();
}

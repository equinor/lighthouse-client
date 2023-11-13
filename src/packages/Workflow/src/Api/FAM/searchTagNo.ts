import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchTagNo(value: string, signal?: AbortSignal): Promise<any[]> {
    const { FAM } = httpClient();
    const noHtExpression = generateExpressions('Register', 'NotEquals', ['HEAT_TRACING_CABLE']);
    const tagNoExpression = generateExpressions('TagNo', 'Like', [value]);
    const request = generateFamRequest(['TagNo'], 'And', [...noHtExpression, ...tagNoExpression]);
    const res = await FAM.fetch('v1/typed/completion/completiontag/facility/JCA?view-version=v1', {
        body: JSON.stringify(request),
        method: 'POST',
        signal,
    });
    return await res.json();
}

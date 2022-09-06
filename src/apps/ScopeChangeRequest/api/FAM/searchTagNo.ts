import { httpClient } from '@equinor/lighthouse-portal-client';
import { generateExpressions, generateFamRequest } from '../../functions/FAM/generateFAMRequest';

export async function searchTagNo(value: string, signal?: AbortSignal): Promise<any[]> {
    const { FAM } = httpClient();
    const noHtExpression = generateExpressions('Register', 'NotEquals', ['HEAT_TRACING_CABLE']);
    const tagNoExpression = generateExpressions('TagNo', 'Like', [value]);
    const request = generateFamRequest(['TagNo'], 'And', [...noHtExpression, ...tagNoExpression]);
    const res = await FAM.fetch('v0.1/dynamic/completion/completiontag/JCA', {
        body: JSON.stringify(request),
        method: 'POST',
        signal,
    });
    return await res.json();
}

import { RCTag } from '@equinor/Workflow';
import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchTagNo(value: string, signal?: AbortSignal): Promise<RCTag[]> {
    const { FAM } = httpClient();
    const noHtExpression = generateExpressions('Register', 'NotEquals', ['HEAT_TRACING_CABLE']);
    const tagNoExpression = generateExpressions('TagNo', 'Like', [value]);
    const request = generateFamRequest(['TagNo'], 'And', [...noHtExpression, ...tagNoExpression]);
    const res = await FAM.fetch('v1/typed/completion/custom_rctag/facility/JCA?view-version=v0', {
        body: JSON.stringify(request),
        method: 'POST',
        headers: { ['content-type']: 'application/json' },
        signal,
    });
    return await res.json();
}

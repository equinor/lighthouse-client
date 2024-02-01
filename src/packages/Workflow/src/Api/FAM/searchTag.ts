import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchTag(value: string): Promise<any[]> {
    const { FAM } = httpClient();
    const noHtExpression = generateExpressions('Register', 'NotEquals', ['HEAT_TRACING_CABLE']);
    const tagNoExpression = generateExpressions('TagNo', 'Equals', [value]);
    const request = generateFamRequest(
        [
            'TagId',
            'TagNo',
            'UrlId',
            'Facility',
            'Function',
            'Register',
            'CommissioningPackageNo',
            'CommissioningPackageUrlId',
            'MechanicalCompletionPackageNo',
            'MechanicalCompletionPackageUrlId',
            'Location',
            'OpenWorkOrders',
            'TagMountedOnNo',
            'TagMoutedOnUrlId',
            'RelatedHTCables',
            'MccrStatus',
            'CommissioningStatus',
        ],
        'And',
        [...noHtExpression, ...tagNoExpression]
    );
    const res = await FAM.fetch('v1/typed/completion/custom_rctag/facility/JCA?view-version=v0', {
        body: JSON.stringify(request),
        method: 'POST',
        headers: { ['content-type']: 'application/json' },
    });
    return await res.json();
}

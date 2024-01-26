import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchTag(value: string): Promise<any[]> {
    const { FAM } = httpClient();
    const noHtExpression = generateExpressions('Register', 'NotEquals', ['HEAT_TRACING_CABLE']);
    const tagNoExpression = generateExpressions('TagNo', 'Equals', [value]);
    const request = generateFamRequest(
        // Må fjerne en del av disse feltene?
        [
            'Facility',
            'Project',
            'TagNo',
            'Register',
            'Function',
            'FunctionalSystem',
            'CommissioningPackageNo',
            'CommissioningPackageId',
            'CommissioningPackageUrlId',
            'MechanicalCompletionPackageNo',
            'MechanicalCompletionPackageId',
            'MechanicalCompletionPackageUrlId',
            'Location',
            'TagId',
            'TagUrlId',
            'OpenWorkOrderIds',
            'OpenWorkOrders',
            'Status',
            'InstalledCableLength',
            'TagMountedOn',
            'TagMountedOnNo',
            'TagMountedOnUrlId',
            'HeatedTagNos',
            'MountedOnHeatTracingCableTagNos',
            'HeatTracingCableTagNos',
            'EstimatedCableLength',
            'CableTagNos',
        ],
        'And',
        [...noHtExpression, ...tagNoExpression]
    );
    const res = await FAM.fetch(
        // 'v1/typed/completion/custom_scope_tag/facility/JCA?view-version=v1',
        'v1/typed/completion/custom_rctag/facility/JCA?view-version=v0',
        {
            body: JSON.stringify(request),
            method: 'POST',
            headers: { ['content-type']: 'application/json' },
        }
    );
    return await res.json();
}

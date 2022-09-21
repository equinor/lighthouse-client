import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchTag(value: string, signal?: AbortSignal): Promise<any[]> {
    const { FAM } = httpClient();
    const noHtExpression = generateExpressions('Register', 'NotEquals', ['HEAT_TRACING_CABLE']);
    const tagNoExpression = generateExpressions('TagNo', 'Equals', [value]);
    const request = generateFamRequest(
        [
            'Facility',
            'Project',
            'TagNo',
            'Register',
            'Function',
            'FunctionalSystem',
            'CommissioningPackageNo',
            'CommissioningPackageId',
            'MechanicalCompletionPackageNo',
            'MechanicalCompletionPackageId',
            'Location',
            'TagId',
            'OpenWorkOrderIds',
            'OpenWorkOrders',
            'Status',
            'InstalledCableLength',
            'MountedOn',
            'RelatedHTCables',
            'TagMountedOn',
            'EstimatedCableLength',
        ],
        'And',
        [...noHtExpression, ...tagNoExpression]
    );
    const res = await FAM.fetch('v0.1/dynamic/completion/custom_scope_tag/JCA', {
        body: JSON.stringify(request),
        method: 'POST',
        signal,
    });
    return await res.json();
}

import { httpClient } from '@equinor/lighthouse-portal-client';
import { generateExpressions, generateFamRequest } from '../../functions/FAM/generateFAMRequest';

export async function searchHtCable(value: string, signal?: AbortSignal): Promise<any[]> {
    const { FAM } = httpClient();
    const htExpression = generateExpressions('Register', 'Equals', ['HEAT_TRACING_CABLE']);
    const tagNoExpression = generateExpressions('TagNo', 'Like', [value]);

    const request = generateFamRequest(
        [
            'Facility',
            'Project',
            'TagNo',
            'Register',
            'Function',
            'CommissioningPackageNo',
            'CommissioningPackageId',
            'MechanicalCompletionPackageNo',
            'MechanicalCompletionPackageId',
            'Location',
            'TagId',
            'MountedOn',
            'RelatedHTCables',
            'OpenWorkOrders',
            'Status',
            'InstalledCableLength',
            'TagHeated',
        ],
        'And',
        [...htExpression, ...tagNoExpression]
    );
    const res = await FAM.fetch('v0.1/dynamic/completion/custom_scope_tag/JCA', {
        body: JSON.stringify(request),
        method: 'POST',
        signal,
    });
    return await res.json();
}

import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';

export async function searchHtCable(value: string): Promise<any[]> {
    const { FAM } = httpClient();
    const htExpression = generateExpressions('Register', 'Equals', ['HEAT_TRACING_CABLE']);
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
            'TagHeated',
            'TagMountedOn',
            'EstimatedCableLength',
            'SwitchBoardTagNos',
            'CircuitTagNos',
        ],
        'And',
        [...htExpression, ...tagNoExpression]
    );
    const res = await FAM.fetch('v0.1/dynamic/completion/custom_scope_tag/JCA', {
        body: JSON.stringify(request),
        method: 'POST',
    });
    return await res.json();
}

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
            'HeatedTagNos',
            'EstimatedCableLength',
            'SwitchBoardTagNos',
            'CircuitAndStarterTagNos',
            'CableTagNos',
        ],
        'And',
        [...htExpression, ...tagNoExpression]
    );
    const res = await FAM.fetch('v1/typed/completion/custom_scope_tag/JCA', {
        body: JSON.stringify(request),
        method: 'POST',
    });
    return await res.json();
}

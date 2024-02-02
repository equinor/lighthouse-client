import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { FamTag } from '../../Types/FAMTypes';

export async function searchTag(value: string): Promise<FamTag[]> {
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
        'v1/typed/completion/custom_scope_tag/facility/JCA?view-version=v1',
        {
            body: JSON.stringify(request),
            method: 'POST',
            headers: { ['content-type']: 'application/json' },
        }
    );
    return await res.json();
}

import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { usePackageResource } from '@equinor/GardenUtils';
import { useHttpClient } from '@equinor/lighthouse-portal-client';
import { useCallback } from 'react';
import { WorkOrderMccr } from '../../../models';
const mccrColumnNames = [
    'WorkOrderId',
    'TagNumber',
    'TagId',
    'TagUrlId',
    'Description',
    'MccrType',
    'MccrStatus',
    'MccrResponsible',
    'MccrId',
    'MccrUrlId',
    'McpkgNumber',
    'McPkgId',
    'MechanicalCompletionPackageUrlId',
    'CommpkgId',
    'CommissioningPackageUrlId',
    'CommpkgNumber',
];

export const useMccr = (
    packageId: string | null
): { mccr: WorkOrderMccr[] | undefined; isFetching: boolean; error: Error | null } => {
    const { FAM } = useHttpClient();

    const fetch = useCallback(async (id: string, signal?: AbortSignal) => {
        const famExpression = generateExpressions('WorkOrderId', 'Equals', [id]);
        const famFilter = generateFamRequest(mccrColumnNames, 'Or', famExpression);
        const response = await FAM.post(
            `v1/typed/completion/customapi_workorderchecklists/facility/JCA?view-version=v0`,
            {
                signal,
                body: JSON.stringify(famFilter),
            }
        );
        return JSON.parse(await response.text()) as WorkOrderMccr[];
    }, []);
    const resource = usePackageResource('mccr', packageId || '', fetch);

    return {
        mccr: resource?.data?.filter(
            (wo, i, list) => i === list.findIndex((w) => w.tagNumber === wo.tagNumber)
        ),
        isFetching: resource.isFetching,
        error: resource.error,
    };
};

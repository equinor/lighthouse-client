import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { usePackageResource } from '@equinor/GardenUtils';
import { useHttpClient } from '@equinor/lighthouse-portal-client';
import { useCallback } from 'react';
import { WorkOrderMaterial } from '../../../models';
const materialColumnNames = [
    'WorkOrderId',
    'ItemNumber',
    'Description',
    'Information',
    'Quantity',
    'Unit',
    'UnitDescription',
    'Status',
    'StatusDescription',
    'StockLocation',
    'StockLocationDescription',
    'Available',
];
export const useMaterial = (
    packageId: string | null
): { material: WorkOrderMaterial[] | undefined; isFetching: boolean; error: Error | null } => {
    const { FAM } = useHttpClient();
    const fetch = useCallback(async (id: string, signal?: AbortSignal) => {
        const famExpression = generateExpressions('WorkOrderId', 'Equals', [id]);
        const famFilter = generateFamRequest(materialColumnNames, 'Or', famExpression);
        const response = await FAM.post(
            `v1/typed/completion/customapi_workordermaterials/facility/JCA?view-version=v0`,
            {
                signal,
                body: JSON.stringify(famFilter),
            }
        );

        return JSON.parse(await response.text()) as WorkOrderMaterial[];
    }, []);

    const resource = usePackageResource<WorkOrderMaterial>('material', packageId || '', fetch);

    return {
        material: resource?.data?.filter(
            (wo, i, list) => i === list.findIndex((w) => w.itemNumber === wo.itemNumber)
        ),
        isFetching: resource.isFetching,
        error: resource.error,
    };
};

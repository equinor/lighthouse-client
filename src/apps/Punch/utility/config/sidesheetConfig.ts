import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { IdResolverFunc, setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { PunchSideSheet } from '../../components';
import { Punch } from '../../types';
const customPunchColumns = [
    'PunchId',
    'Facility',
    'Project',
    'PunchItemNo',
    'ChecklistId',
    'Description',
    'Category',
    'RaisedBy',
    'CleardBy',
    'DueDate',
    'Sorting',
    'Type',
    'Priority',
    'FAMUpsertedTime',
    'Status',
    'IsOpen',
    'HasWO',
    'isOverdue',
    'Estimate',
    'WorkOrderNo',
    'WorkOrderId',
    'WorkOrderUrlId',
    'OriginalWorkOrderNo',
    'SoftwareChangeRecordNo',
    'DocumentNo',
    'ExternalItemNo',
    'MaterialRequired',
    'MaterialEstimatedTimeOfArrival',
    'ExternalMaterialNo',
    'ClearedAtDate',
    'RejectedAtDate',
    'VerifiedAtDate',
    'CreatedDate',
    'FormularGroup',
    'FormularType',
    'FormularDiscipline',
    'TagId',
    'TagNo',
    'TagUrlId',
    'Discipline',
    'DisciplineDescription',
    'Responsible',
    'CallOffNo',
    'PackageNo',
    'CommissioningPackageNo',
    'TagArea',
    'CommissioningPackageId',
    'CommissioningPackageUrlId',
    'Identifier',
    'CommissioningPackageArea',
    'System',
    'priority1',
    'priority2',
    'priority3',
    'MechanicalCompletionPackageNo',
    'MechanicalCompletionPackageId',
    'MechanicalCompletionPackageUrlId',
    'MechanicalCompletionStatus',
    'HandoverPlan',
    'M03_PlannedForecastDate',
    'RFC_PlannedForecastDate',
    'RFC_PlannedDate',
    'RFO_PlannedForecastDate',
    'RFO_PlannedDate',
];
const idResolverFunction = async (id: string): Promise<Punch> => {
    const { FAM } = httpClient();
    const expressions = generateExpressions('punchItemNo', 'Equals', [id]);
    const requestArgs = generateFamRequest(customPunchColumns, 'Or', expressions);
    const res = await FAM.fetchAsync(
        'v1/typed/completion/custom_punch/facility/JCA?view-version=v1',
        {
            body: JSON.stringify(requestArgs),
            method: 'POST',
            headers: { 'content-type': 'application/json' },
        }
    );

    if (!res.ok) {
        throw 'Not found';
    }

    const punches = await res.json();
    if (Array.isArray(punches) && punches.length === 1) {
        return punches[0];
    } else {
        throw 'Invalid response';
    }
};
const idResolver: IdResolverFunc<Punch> = idResolverFunction;

export const sidesheetConfig = setupWorkspaceSidesheet<Punch, 'punchDetails'>({
    id: 'punchDetails',
    component: PunchSideSheet,
    color: '#0364B8',
    props: {
        objectIdentifier: 'punchItemNo',
        parentApp: 'punch',
        function: idResolver,
    },
});

export const punchSidesheetWidgetManifest = sidesheetConfig('SidesheetManifest');
export const punchSidesheetWidgetComponent = sidesheetConfig('SidesheetComponentManifest');
export const punchResolverFunction = sidesheetConfig('ResolverFunction');

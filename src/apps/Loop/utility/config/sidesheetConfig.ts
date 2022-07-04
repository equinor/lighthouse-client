import { httpClient } from '@equinor/lighthouse-portal-client';
import { IdResolverFunc } from '@equinor/WorkSpace';
import { setupWorkspaceSidesheet } from '../../../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';

import { LoopSidesheet } from '../../components';
import { Loop } from '../../types';
import { generateExpressions, generateFamRequest } from '../helpers/fam';
const checklistColumnNames = [
    'ChecklistId',
    'Facility',
    'Project',
    'LoopId',
    'LoopNo',
    'Description',
    'MechanicalCompletionPackageNo',
    'MechanicalCompletionPackageId',
    'CommissioningPackageNo',
    'CommissioningPackageId',
    'FormularType',
    'FormularGroup',
    'Responsible',
    'Status',
    'Revision',
    'SignedDate',
    'VerifiedDate',
    'RFC_Planned_Forecast_Date',
    'RFO_Planned_Forecast_Date',
    'WOPlannedCompletionDate',
    'WOActualCompletionDate',
    'RemainingManHours',
    'System',
    'FunctionalSystem',
    'Priority1',
    'Priority2',
    'Priority3',
    'Location',
    'IsVoided',
    'PackageNo',
    'CallOffNo',
    'Register',
    'Function',
    'LoopContentStatus',
];
const idResolverFunction = async (id: string): Promise<Loop> => {
    const { FAM } = httpClient();
    const expressions = generateExpressions('checklistId', 'Equals', [id]);
    const requestArgs = generateFamRequest(checklistColumnNames, 'Or', expressions);
    const res = await FAM.post('v0.1/dynamic/completion/custom_loopmccr/JCA', {
        body: JSON.stringify(requestArgs),
    });

    if (!res.ok) {
        throw 'Not found';
    }
    const loops = await res.json();
    if (Array.isArray(loops) && loops.length === 1) {
        return loops[0];
    } else {
        throw 'Invalid response';
    }
};
const idResolver: IdResolverFunc<Loop> = idResolverFunction;
export const sidesheetConfig = setupWorkspaceSidesheet<Loop, 'loop'>({
    id: 'loop',
    color: '#7B3A96',
    component: LoopSidesheet,
    props: {
        objectIdentifier: 'checklistId',
        parentApp: 'loop',
        function: idResolver,
    },
});

export const loopSidesheetWidgetManifest = sidesheetConfig('SidesheetManifest');
export const loopSidesheetWidgetComponent = sidesheetConfig('SidesheetComponentManifest');
export const loopResolverFunction = sidesheetConfig('ResolverFunction');

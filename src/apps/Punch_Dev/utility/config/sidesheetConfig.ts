import { generateExpressions, generateFamRequest } from '@equinor/GardenUtils';
import { IdResolverFunc } from '@equinor/WorkSpace';
import { setupWorkspaceSidesheet } from '../../../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { PunchSidesheet } from '../../components';
import { Punch } from '../../types';
import { getPunch, punchColumns } from '../api';

const idResolverFunction = async (id: string): Promise<Punch> => {
    const expressions = generateExpressions('punchItemNo', 'Equals', [id]);
    const requestArgs = generateFamRequest(punchColumns, 'Or', expressions);
    const res = await getPunch(requestArgs);

    if (Array.isArray(res) && res.length === 1) {
        return res[0];
    } else {
        throw 'Invalid response';
    }
};

const idResolver: IdResolverFunc<Punch> = idResolverFunction;
export const sidesheetConfig = setupWorkspaceSidesheet<Punch, 'punch'>({
    id: 'punch',
    color: '#7B3A96',
    component: PunchSidesheet,
    props: {
        objectIdentifier: 'punchItemNo',
        parentApp: 'punch',
        function: idResolver,
    },
});
export const punchSidesheetWidgetManifest = sidesheetConfig('SidesheetManifest');
export const punchidesheetWidgetComponent = sidesheetConfig('SidesheetComponentManifest');
export const punchResolverFunction = sidesheetConfig('ResolverFunction');
